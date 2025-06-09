import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createDB } from '$lib/server/db';
import { IdValidLength } from '$lib/server/validation';
import { chapter, novel } from '$lib/server/db/schema/novel.schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params, fetch, platform }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    const db = createDB(platform!.env.DB);
    const currentNovel = await db.query.novel.findFirst({
      where: eq(novel.id, novelId),
      columns: { id: true }
    });
    if (!currentNovel) return json({ success: false, error: 'Novel Not Found' }, { status: 404 });

    const chapters = await db.query.chapter.findMany({
      where: eq(chapter.novelId, novelId),
      columns: { content: false, novelId: false }
    });

    return json({ success: true, data: chapters });
  } catch (err) {
    return json({ error: 'Internal Server Errror' }, { status: 500 });
  }
};
