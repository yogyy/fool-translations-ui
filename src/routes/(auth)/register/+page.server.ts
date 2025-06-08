import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { registerSchema, type AuthResponse } from '../auth.validation';
import { TURNSLITE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_APP_ENV } from '$env/static/public';
import type { TurnstileResponse } from '$lib/types';
import { createUser } from '$lib/server/service/auth.service';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { generateRandId, UNIQUE_CONSTRAINT } from '$lib/server/utils';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(302, '/');

  return { form: await superValidate(zod4(registerSchema)) };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(registerSchema));
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
      const userId = generateRandId('usr');
      await createUser({
        env: event.platform!.env,
        email: form.data.email.toLowerCase(),
        id: userId,
        name: form.data.name,
        password: form.data.password,
        provider: 'credentials'
      });

      const token = generateSessionToken();
      const session = await createSession(event.platform!.env.DB, token, userId);
      setSessionTokenCookie(event, token, session.expiresAt);

      return { form, success: true };
    } catch (err: any) {
      if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
        return message(form, 'Email Already Used', { status: 400 });
      }
      console.error(err);
      return message(form, 'Internal Server Errror', { status: 500 });
    }
  }
} satisfies Actions;
