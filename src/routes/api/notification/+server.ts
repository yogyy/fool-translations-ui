import { BE_URL } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ fetch, locals, request }) => {
  if (!locals.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const res = await fetch(`${BE_URL}/notifications`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();
  return json(data);
};

export const DELETE: RequestHandler = async ({ fetch, locals, request }) => {
  if (!locals.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const res = await fetch(`${BE_URL}/notifications`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();
  return json(data);
};
