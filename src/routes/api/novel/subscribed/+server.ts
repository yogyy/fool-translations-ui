import type { RequestHandler } from './$types';
import { BE_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, fetch, url }) => {
  const novelId = url.searchParams.get('novelId');
  const res = await fetch(`${BE_URL}/favorites/${novelId}`);

  const data = await res.json();

  return new Response(JSON.stringify(data));
};

export const POST: RequestHandler = async ({ cookies, fetch, url, locals }) => {
  if (!locals.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const novelId = url.searchParams.get('novelId');
  if (!novelId) {
    return json({ success: false, error: 'novelId param required' });
  }
  const res = await fetch(`${BE_URL}/favorites`, {
    method: 'POST',
    body: JSON.stringify({ novelId }),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();

  return json(data);
};
