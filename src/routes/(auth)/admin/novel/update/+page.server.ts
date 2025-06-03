import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateNovelSchema } from '../../schema';
import { fail } from '@sveltejs/kit';
import { BE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || locals.user.type !== 'admin') {
    return error(404, 'Page Not Found');
  }

  return { form: await superValidate(zod(updateNovelSchema)) };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(updateNovelSchema));
    if (!form.valid) return fail(400, { form });

    const arrGenres = form.data.genres.split(',');
    const bodyData = { ...form.data, genres: arrGenres };

    const res = await fetch(`${BE_URL}/admin/novel/${event.url.searchParams.get('novelId')}`, {
      method: 'PUT',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-type': 'application/json',
        Cookie: `session=${event.cookies.get('session')}`
      }
    });

    const updatedNovel = await res.json();

    return { form, updatedNovel };
  }
};
