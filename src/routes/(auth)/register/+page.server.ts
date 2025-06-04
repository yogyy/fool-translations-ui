import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema, type AuthResponse } from '../schema';
import { BE_URL, TURNSLITE_SECRET_KEY } from '$env/static/private';
import { parseString } from 'set-cookie-parser';
import { setSessionTokenCookie } from '$lib/session';
import { PUBLIC_APP_ENV } from '$env/static/public';
import type { TurnstileResponse } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    return redirect(302, '/');
  }
  return {
    form: await superValidate(zod(registerSchema))
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(registerSchema));
    if (!form.valid) return fail(400, { form });

    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret:
          PUBLIC_APP_ENV === 'production'
            ? TURNSLITE_SECRET_KEY
            : '1x0000000000000000000000000000000AA',
        response: form.data.token || ''
      })
    });

    const turnstile: TurnstileResponse = await verify.json();

    if (turnstile.success) {
      const res = await fetch(`${BE_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(form.data),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
      });

      const signup: AuthResponse = await res.json();
      if (signup.success) {
        const cookie = parseString(res.headers.get('set-cookie')!);
        setSessionTokenCookie(event, signup.token, cookie.expires as Date);
      }
      return { form, signup };
    } else {
      return { form, turnstile };
    }
  }
};
