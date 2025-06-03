import type { NovelResponse } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ data, fetch, url }) => {
  const res = await fetch(`/api/novel/${url.searchParams.get('novelId')?.slice(4)}`);
  const novelData: NovelResponse = await res.json();

  if (!novelData.success) {
    return error(404, 'Novel Not Found');
  }

  return { ...data, novel: novelData.data };
};
