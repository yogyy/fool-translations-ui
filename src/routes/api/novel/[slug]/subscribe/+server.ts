import { BE_URL } from '$env/static/private';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, params }) => {
  const res = await fetch(`${BE_URL}/novels/nvl_${params.slug}/subscribe`);
  const data = await res.json();

  return json(data);
};

export const POST: RequestHandler = async ({ params, fetch, locals }) => {
  if (!locals.session) return new Response('Unauthorized', { status: 401 });

  const res = await fetch(`${BE_URL}/novels/nvl_${params.slug}/subscribe`, {
    method: 'POST'
  });

  const data = await res.json();

  return json(data);
};
