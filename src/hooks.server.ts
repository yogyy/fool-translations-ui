import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken
} from '$lib/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session') ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(event);
  if (!session) {
    deleteSessionTokenCookie(event);
    return resolve(event);
  }
  setSessionTokenCookie(event, token, session!.expiresAt);

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};
