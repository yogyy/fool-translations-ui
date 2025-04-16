import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema, type AuthResponse } from '../schema';
import { BE_URL } from '$env/static/private';
import { parseString } from 'set-cookie-parser';
import { setSessionTokenCookie } from '$lib/session';

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
  }
};
