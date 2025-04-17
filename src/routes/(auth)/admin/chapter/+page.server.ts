import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { chapterSchema } from '../schema';
import { BE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD_PRESET } from '$env/static/private';
import type { CloudinaryResponse } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || locals.user.type !== 'admin') {
    return error(404, 'Page Not Found');
  }

  return { form: await superValidate(zod(chapterSchema)) };
};

export const actions: Actions = {
  create: async (event) => {
    const form = await superValidate(event, zod(chapterSchema));
    if (!form.valid) return fail(400, { form });

    const blob = new Blob([form.data.content], { type: 'text/markdown' });
    const fileName = `${form.data.novelId.slice(4)}-chapter-${form.data.chapterNum}.md`;

    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('upload_preset', CLOUDINARY_CLOUD_PRESET);
    formData.append('resource_type', 'raw');

    const uploadChapter = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      { method: 'POST', body: formData }
    );

    const chapterData: CloudinaryResponse = await uploadChapter.json();

    const res = await fetch(`${BE_URL}/admin/chapter`, {
      method: 'POST',
      body: JSON.stringify({
        title: form.data.title,
        novelId: form.data.novelId,
        chapterNum: Number(form.data.chapterNum),
        content: chapterData.secure_url
      }),
      headers: {
        'Content-type': 'application/json',
        Cookie: `session=${event.cookies.get('session')}`
      }
    });
    const newChapter = await res.json();

    return { form, newChapter };
  }
};
