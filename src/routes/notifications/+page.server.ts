import { redirect } from '@sveltejs/kit';

export const load = async () => {
  return redirect(302, '/notifications/chapters');
};
