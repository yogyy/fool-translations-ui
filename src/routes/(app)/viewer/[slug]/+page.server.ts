import { createDB } from '$lib/server/db/index.js';
import { chapter, novel } from '$lib/server/db/schema/novel.schema.js';
import { IdValidLength } from '$lib/server/validation.js';
import { error, isHttpError } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';

export const load = async ({ platform, params }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    throw error(404, 'Chapter Not Found');
  }

  const chapterId = `ch_${valid.data.slug}`;
  try {
    const db = createDB(platform!.env.DB);
    const [currentCh] = await db
      .select({
        chapter: chapter,
        novel: {
          id: novel.id,
          title: novel.title,
          cover: novel.cover,
          banner: novel.banner
        }
      })
      .from(chapter)
      .where(eq(chapter.id, chapterId))
      .innerJoin(novel, eq(chapter.novelId, novel.id));

    if (!currentCh) throw error(404, 'Chapter Not Found');

    db.update(novel)
      .set({ totalViews: sql`${novel.totalViews} + 1` })
      .where(eq(novel.id, currentCh.novel.id))
      .run();

    const [prevCh] = await db
      .select({ id: chapter.id })
      .from(chapter)
      .where(
        and(
          eq(chapter.novelId, currentCh.novel.id),
          eq(chapter.chapterNum, currentCh.chapter.chapterNum - 1)
        )
      )
      .limit(1);
    const [nextCh] = await db
      .select({ id: chapter.id })
      .from(chapter)
      .where(
        and(
          eq(chapter.novelId, currentCh.novel.id),
          eq(chapter.chapterNum, currentCh.chapter.chapterNum + 1)
        )
      )
      .limit(1);

    return {
      ...currentCh,
      prev: prevCh?.id || null,
      next: nextCh?.id || null
    };
  } catch (err) {
    if (isHttpError(err)) {
      throw error(err.status, err.body.message);
    }

    console.error(err);
    throw error(500, 'Internal Server Error');
  }
};
