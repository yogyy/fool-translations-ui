import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie
} from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session') ?? null;

  // if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
  //   return new Response(null, { status: 204 }); // Return empty response with 204 No Content
  // }

  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(event.platform!.env.DB, token);
  if (session !== null) {
    setSessionTokenCookie(event, token, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};
