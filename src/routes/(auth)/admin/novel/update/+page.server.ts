import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { updateNovelSchema } from '../../admin.validation';
import { fail, type Actions } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/utils';
import { updateNovel } from '$lib/server/service';

export const load: PageServerLoad = async ({ locals }) => {
  requireAdmin(locals);
  return { form: await superValidate(zod4(updateNovelSchema)) };
};

export const actions = {
  default: async (event) => {
    requireAdmin(event.locals);

    const form = await superValidate(event, zod4(updateNovelSchema));
    if (!form.valid) return fail(400, { form });

    const arrGenres = form.data.genres.split(',');
    const bodyData = { ...form.data, genres: arrGenres };

    try {
      const updatedNovel = await updateNovel(event.platform!.env, bodyData, form.data.id);
      if (!updatedNovel) return message(form, 'Novel Not Found', { status: 404 });

      return { form, novel: updatedNovel };
    } catch (err) {
      console.error(err);
      return message(form, 'Internal Server Errror', { status: 500 });
    }
  }
} satisfies Actions;
