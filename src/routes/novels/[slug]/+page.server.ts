import { BE_URL } from '$env/static/private';
import type { NovelResponse, SubsResponse } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
  if (params.slug.length !== 16) {
    throw error(404, 'Novel Not Found');
  }
  const res = await fetch(`${BE_URL}/novels/nvl_${params.slug}`);

  if (res.status === 404) {
    throw error(404, 'Novel Not Found');
  }

  const novelData: NovelResponse = await res.json();

  return { novel: novelData.data };
};
