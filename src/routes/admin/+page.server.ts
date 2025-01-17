import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { novelSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { BE_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(novelSchema))
  };
};

export const actions: Actions = {
  create: async (event) => {
    const form = await superValidate(event, zod(novelSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const arrGenres = form.data.genres.split(',');
    const bodyData = { ...form.data, genres: arrGenres };

    const res = await fetch(`${BE_URL}/novels/add`, {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: { 'Content-type': 'application/json' }
    });
    const newNovel = await res.json();

    return { form, newNovel };
  }
};
