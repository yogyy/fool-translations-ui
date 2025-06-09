import { createDB } from '$lib/server/db/index.js';
import { novel, rating } from '$lib/server/db/schema/novel.schema.js';
import { avg, count, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ platform }) => {
  const novels = await createDB(platform!.env.DB)
    .select({
      id: novel.id,
      title: novel.title,
      genres: novel.genres,
      cover: novel.cover,
      lastUpdated: novel.lastUpdated,
      totalViews: novel.totalViews,
      status: novel.status,
      popularityScore: sql<number>`${count(rating.id)} * ${avg(rating.rating)}`
    })
    .from(novel)
    .leftJoin(rating, eq(novel.id, rating.novelId))
    .groupBy(novel.id)
    .orderBy(desc(sql`${count(rating.id)} * ${avg(rating.rating)}`))
    .limit(12);

  return { novels: novels };
};
