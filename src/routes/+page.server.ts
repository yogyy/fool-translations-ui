import { BE_URL } from '$env/static/private';
import type { HotNovel, Topnovel } from '$lib/types.js';

export const load = async ({ fetch }) => {
  const hotRes = await fetch(`${BE_URL}/novels/featured/hot`);
  const hotnovels = await hotRes.json();

  const topRes = await fetch(`${BE_URL}/novels/featured/top`);
  const topnovels = await topRes.json();

  return {
    featured: {
      hot: hotnovels.data as HotNovel[],
      top: topnovels.data as Topnovel[]
    }
  };
};
