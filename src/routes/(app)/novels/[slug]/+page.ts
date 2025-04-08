import type { ApiResponse, Chapter, FavoriteData, RatingData, SubscribeData } from '$lib/types.js';

export const load = async ({ data, fetch, params, depends }) => {
  const favorite = await fetch(`/api/novel/${params.slug}/favorite`);
  const favoriteData: ApiResponse<FavoriteData> = await favorite.json();

  const subs = await fetch(`/api/novel/${params.slug}/subscribe`);
  const SubsData: ApiResponse<SubscribeData> = await subs.json();

  const rate = await fetch(`/api/novel/${params.slug}/rating`);
  const rateData: ApiResponse<RatingData> = await rate.json();

  const chapters = await fetch(`/api/novel/${params.slug}/chapters`);
  const chaptersData: ApiResponse<Omit<Chapter, 'content'>[]> = await chapters.json();

  return {
    ...data,
    subscribe: SubsData.data,
    favorite: favoriteData.data,
    rating: rateData.data,
    chapters: chaptersData.data
  };
};
