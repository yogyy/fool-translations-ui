import type { PageServerLoad } from './$types';
import { BE_URL } from '$env/static/private';
import type { ApiResponse, Notification } from '$lib/types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
  if (locals.user) {
    const res = await fetch(`${BE_URL}/notifications`);
    const data: ApiResponse<Notification[]> = await res.json();

    return { chapters: data.data };
  }
};
