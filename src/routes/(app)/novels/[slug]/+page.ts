import type { ApiResponse, Chapter, FavoriteData, RatingData, SubscribeData } from '$lib/types.js';

export const load = async ({ data, fetch, params }) => {
  const [favoriteRes, subsRes, rateRes, chaptersRes] = await Promise.all([
    fetch(`/api/novel/${params.slug}/favorite`),
    fetch(`/api/novel/${params.slug}/subscribe`),
    fetch(`/api/novel/${params.slug}/rating`),
    fetch(`/api/novel/${params.slug}/chapters`)
  ]);

  const [favoriteData, subsData, rateData, chaptersData] = await Promise.all([
    favoriteRes.json() as Promise<ApiResponse<FavoriteData>>,
    subsRes.json() as Promise<ApiResponse<SubscribeData>>,
    rateRes.json() as Promise<ApiResponse<RatingData>>,
    chaptersRes.json() as Promise<ApiResponse<Omit<Chapter, 'content'>[]>>
  ]);

  return {
    ...data,
    subscribe: subsData.data,
    favorite: favoriteData.data,
    rating: rateData.data,
    chapters: chaptersData.data
  };
};
