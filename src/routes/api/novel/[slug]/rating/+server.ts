import { BE_URL } from '$env/static/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, fetch, params }) => {
  if (!locals.session) return json({ success: true, data: { isRated: false, rating: 0 } });

  const res = await fetch(`${BE_URL}/novels/nvl_${params.slug}/rating`);
  const data = await res.json();

  return json(data);
};

export const POST: RequestHandler = async ({ fetch, locals, request, params }) => {
  if (!locals.session) return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const res = await fetch(`${BE_URL}/novels/nvl_${params.slug}/rating`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' }
  });

  const data = await res.json();
  return json(data);
};
