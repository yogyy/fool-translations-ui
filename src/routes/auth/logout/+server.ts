import { BE_URL } from '$env/static/private';
import { deleteSessionTokenCookie } from '$lib/session';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  if (event.locals.session === null) {
    redirect(302, '/');
  }

  const res = await event.fetch(`${BE_URL}/auth/signout`, {
    method: 'POST',
    credentials: 'include'
  });
  const data = await res.json();
  if (res.ok) deleteSessionTokenCookie(event);

  return new Response(JSON.stringify(data));
};
