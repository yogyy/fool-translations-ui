import type { RatingResponse, SubsResponse } from '$lib/types.js';

export const load = async ({ data, fetch, params, depends }) => {
  depends('novel:subscription');
  const favorite = await fetch(`/api/novel/subscribe/favorite?novelId=nvl_${params.slug}`);
  const notify = await fetch(`/api/novel/subscribe/notify?novelId=nvl_${params.slug}`);
  const rate = await fetch(`/api/novel/rating?novelId=nvl_${params.slug}`);

  const favoriteData: SubsResponse = await favorite.json();
  const notifyData = await notify.json();
  const rateData: RatingResponse = await rate.json();

  return { ...data, subscribed: { ...favoriteData.data, ...notifyData }, rating: rateData };
};
