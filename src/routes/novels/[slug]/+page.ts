import type { Favs, RatingResponse, Subs, ApiResponse } from '$lib/types.js';

export const load = async ({ data, fetch, params, depends }) => {
  const favorite = await fetch(`/api/novel/subscribe/favorite?novelId=nvl_${params.slug}`);
  const favoriteData: ApiResponse<Favs> = await favorite.json();

  const notify = await fetch(`/api/novel/subscribe/notify?novelId=nvl_${params.slug}`);
  const notifyData: ApiResponse<Subs> = await notify.json();

  const rate = await fetch(`/api/novel/rating?novelId=nvl_${params.slug}`);
  const rateData: RatingResponse = await rate.json();

  console.log('fetching additional novel data');
  depends('novel:subscription');

  return {
    ...data,
    subs: { fav: favoriteData.data, ntf: notifyData.data },
    rating: rateData
  };
};
