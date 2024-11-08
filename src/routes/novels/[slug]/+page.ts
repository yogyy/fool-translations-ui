import type { SubsResponse } from '$lib/types.js';

export const load = async ({ data, fetch, params, depends }) => {
  depends('novel:subscription');
  const subs = await fetch(`/api/novel/subscribed?novelId=nvl_${params.slug}`);

  const subsData: SubsResponse = await subs.json();

  return { ...data, subscribed: subsData.data };
};
