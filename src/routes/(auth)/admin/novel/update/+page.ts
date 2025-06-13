import type { Novel } from '$lib/server/db/schema/novel.schema.js';
import { error } from '@sveltejs/kit';

export const load = async ({ data, fetch, url }) => {
  const res = await fetch(`/api/novel/${url.searchParams.get('novelId')?.slice(4)}`);
  if (!res.ok) {
    return error(404, 'Novel Not Found');
  }

  const novelData: { data: Novel } = await res.json();
  return { ...data, novel: novelData.data };
};
