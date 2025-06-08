import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { TURNSLITE_SECRET_KEY } from '$env/static/private';
import type { TurnstileResponse } from '$lib/types';
import { PUBLIC_APP_ENV } from '$env/static/public';
import { createDB } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { loginSchema } from '../auth.validation';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(302, '/');

  return { form: await superValidate(zod4(loginSchema)) };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(loginSchema));
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
    if (!turnstile.success) {
      return message(form, `Turnstile verification failed: ${turnstile?.['error-codes'] || ''}`, {
        status: 401
      });
    }

    try {
      const userExist = await createDB(event.platform!.env.DB).query.user.findFirst({
        where: and(eq(user.email, form.data.email.toLowerCase()), eq(user.provider, 'credentials')),
        columns: { id: true, password: true }
      });
      if (!userExist) {
        return message(form, 'Invalid Email or Password.', { status: 401 });
      }

      if (userExist.password !== form.data.password) {
        return message(form, 'Invalid Email or Password', { status: 401 });
      }

      const token = generateSessionToken();
      const session = await createSession(event.platform!.env.DB, token, userExist?.id);
      setSessionTokenCookie(event, token, session.expiresAt);

      return { form, success: true };
    } catch (err) {
      console.error(err);
      return message(form, 'Internal Server Errror', { status: 500 });
    }
  }
} satisfies Actions;
