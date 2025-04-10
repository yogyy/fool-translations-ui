import { BE_URL } from '$env/static/private';
import type { Novel, NovelResponse } from '$lib/types';

interface NovelsResponse extends Omit<Novel, 'author' | 'synopsis' | 'average_rating' | 'banner'> {
  popularityScore: number;
}

export const load = async ({ fetch, url }) => {
  const res = await fetch(`${BE_URL}/novels?pageSize=12`);
  const novels: { data: NovelsResponse[] } = await res.json();

  return { novels: novels.data };
};
