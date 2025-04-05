import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, type AuthResponse } from '../schema';
import { BE_URL } from '$env/static/private';
import { parseString } from 'set-cookie-parser';
import { deleteSessionTokenCookie, setSessionTokenCookie } from '$lib/session';

export const load: PageServerLoad = async (event) => {
  const referer = event.cookies.get('referer');
  if (event.locals.user !== null) {
    return redirect(302, '/');
  }

  return {
    form: await superValidate(zod(loginSchema)),
    referer
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const res = await fetch(`${BE_URL}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(form.data),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include'
    });
    const signin: AuthResponse = await res.json();
    if (signin.success) {
      const cookie = parseString(res.headers.get('set-cookie')!);
      setSessionTokenCookie(event, signin.token, cookie.expires as Date);
    }

    return { form, signin };
  }
};
