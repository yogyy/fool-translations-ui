import { BE_URL } from '$env/static/private';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
  const novelId = url.searchParams.get('novelId');
  const res = await fetch(`${BE_URL}/subscribes/${novelId}`);

  const data = await res.json();

  return json(data);
};

export const POST: RequestHandler = async ({ cookies, fetch, url, locals }) => {
  if (!locals.session) return new Response('Unauthorized', { status: 401 });

  const novelId = url.searchParams.get('novelId');
  if (!novelId) return json({ success: false, error: 'novelId param required' });

  const res = await fetch(`${BE_URL}/subscribes/notify`, {
    method: 'POST',
    body: JSON.stringify({ novelId }),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();

  return json(data);
};
