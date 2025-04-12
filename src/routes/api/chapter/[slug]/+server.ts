import { BE_URL } from '$env/static/private';
import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const res = await fetch(`${BE_URL}/chapters/ch_${params.slug}`);

  if (res.status === 404) {
    throw error(404, 'Novel Not Found');
  }

  const data = await res.json();

  return json(data);
};
