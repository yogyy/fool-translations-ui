import { BE_URL } from '$env/static/private';
import type { Novel, NovelResponse } from '$lib/types';
import { error } from '@sveltejs/kit';

interface NovelsResponse extends Pick<Novel, 'id' | 'title' | 'genres' | 'cover'> {
  totalRatings: number;
  averageRating: string;
  popularityScore: number;
}

export const load = async ({ fetch }) => {
  const res = await fetch(`${BE_URL}/novels`);

  if (res.status === 404) {
    throw error(404, 'Novel Not Found');
  }

  const novels: { data: NovelsResponse[] } = await res.json();

  return { novels: novels.data };
};
