import { BE_URL } from '$env/static/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, fetch, url }) => {
  if (!locals.session) {
    return json({ success: false, error: 'Unauthorized' });
  }

  const novelId = url.searchParams.get('novelId');
  const res = await fetch(`${BE_URL}/ratings/${novelId}`);

  const data = await res.json();

  return new Response(JSON.stringify(data));
};

export const POST: RequestHandler = async ({ fetch, url, locals, request }) => {
  if (!locals.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const res = await fetch(`${BE_URL}/ratings/rate`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();
  return json(data);
};
