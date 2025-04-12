import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { BE_URL } from '$env/static/private';
import type { ApiResponse, Notification } from '$lib/types';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    console.log('ngefetch nih bos');
    const res = await event.fetch(`${BE_URL}/notifications`);
    const data: ApiResponse<Notification[]> = await res.json();

    return { chapters: data.data };
  }
};
