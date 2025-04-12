import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, type AuthResponse } from '../schema';
import { BE_URL } from '$env/static/private';
import { parseString } from 'set-cookie-parser';
import { setSessionTokenCookie } from '$lib/session';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user !== null) {
    return redirect(302, '/');
  }

  return { form: await superValidate(zod(loginSchema)) };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) return fail(400, { form });

    const res = await fetch(`${BE_URL}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(form.data),
      headers: { 'Content-type': 'application/json' }
    });
    const signin: AuthResponse = await res.json();
    if (signin.success) {
      const cookie = parseString(res.headers.get('set-cookie')!);
      setSessionTokenCookie(event, cookie.value, cookie.expires as Date);
    }

    return { form, signin };
  }
};
