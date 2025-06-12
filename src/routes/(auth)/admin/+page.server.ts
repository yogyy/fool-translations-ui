import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || locals.user.type !== 'admin') {
    return error(404, 'Page Not Found');
  }

  redirect(302, '/admin/novel');
};
