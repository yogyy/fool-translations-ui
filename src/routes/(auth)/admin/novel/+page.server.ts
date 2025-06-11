import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { novelSchema } from '../admin.validation';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { addNewNovel } from '$lib/server/service';
import { requireAdmin, UNIQUE_CONSTRAINT } from '$lib/server/utils';

export const load: PageServerLoad = async ({ locals }) => {
  requireAdmin(locals);
  return { form: await superValidate(zod4(novelSchema)) };
};

export const actions: Actions = {
  create: async (event) => {
    requireAdmin(event.locals);

    const form = await superValidate(event, zod4(novelSchema));
    if (!form.valid) return fail(400, { form });

    const arrGenres = form.data.genres.split(',');
    const bodyData = { ...form.data, genres: arrGenres };

    try {
      const newNovel = await addNewNovel(event.platform!.env, bodyData);
      return { form, novel: newNovel };
    } catch (err: any) {
      if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
        return message(form, `Novel '${bodyData.title}' Already Exists`, { status: 400 });
      }
      console.log(err);
      return message(form, 'Internal Server Errror', { status: 500 });
    }
  }
} satisfies Actions;
