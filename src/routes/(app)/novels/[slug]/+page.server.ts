import { createDB } from '$lib/server/db/index.js';
import { novel, rating } from '$lib/server/db/schema/novel.schema.js';
import { IdValidLength } from '$lib/server/validation.js';
import { error, isHttpError } from '@sveltejs/kit';
import { avg, eq, sql } from 'drizzle-orm';

export const load = async ({ params, platform }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    throw error(404, 'Novel Not Found');
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    const db = createDB(platform!.env.DB);
    const updateView = db
      .update(novel)
      .set({ totalViews: sql`${novel.totalViews} + 1` })
      .where(eq(novel.id, novelId))
      .prepare();

    const novelbyId = await db.query.novel.findFirst({ where: eq(novel.id, novelId) });

    if (!novelbyId) throw error(404, 'Novel Not Found');

    const [rate] = await db
      .select({ value: avg(rating.rating) })
      .from(rating)
      .where(eq(rating.novelId, novelId));
    updateView.run();

    return { novel: { ...novelbyId, averageRating: Number(rate.value) } };
  } catch (err) {
    if (isHttpError(err)) {
      return error(err.status, err.body.message);
    }

    console.error(err);
    return error(500, 'Internal Server Error');
  }
};
