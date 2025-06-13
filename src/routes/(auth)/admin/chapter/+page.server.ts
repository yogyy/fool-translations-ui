import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { chapterSchema } from '../admin.validation';
import {
  addChapter,
  getNovel,
  notifySubscribers,
  updateLastUpdatedForNovel
} from '$lib/server/service';
import { requireAdmin, UNIQUE_CONSTRAINT } from '$lib/server/utils';

export const load: PageServerLoad = async ({ locals }) => {
  requireAdmin(locals);
  return { form: await superValidate(zod4(chapterSchema)) };
};

export const actions = {
  create: async (event) => {
    requireAdmin(event.locals);

    const form = await superValidate(event, zod4(chapterSchema));
    if (!form.valid) return fail(400, { form });

    const currentNovel = await getNovel(event.platform!.env, form.data.novelId, false);
    if (!currentNovel) return message(form, 'Novel Not Found', { status: 404 });

    try {
      const newChapter = await addChapter(event.platform!.env, {
        title: form.data.title,
        novelId: currentNovel.id,
        chapterNum: form.data.chapterNum,
        content: form.data.content
      });

      if (newChapter) {
        updateLastUpdatedForNovel(event.platform!.env, newChapter.novelId);
        notifySubscribers(event.platform!.env, newChapter.novelId);
      }

      return { form, chapter: newChapter };
    } catch (err: any) {
      if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
        return message(form, `Chapter ${form.data.chapterNum} Already Exists`, { status: 409 });
      }

      console.error(err);
      return message(form, 'Internal Server Errror', { status: 500 });
    }
  }
} satisfies Actions;
