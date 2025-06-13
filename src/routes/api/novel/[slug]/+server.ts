import { error, isHttpError, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createDB } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { novel } from '$lib/server/db/schema/novel.schema';
import { IdValidLength } from '$lib/server/validation';

export const GET: RequestHandler = async ({ params, platform }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    const novelbyId = await createDB(platform!.env.DB).query.novel.findFirst({
      where: eq(novel.id, `nvl_${params.slug}`)
    });
    if (!novelbyId) return json({ error: 'Novel Not Found' }, { status: 404 });

    return json({ data: novelbyId });
  } catch (err) {
    console.error(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
