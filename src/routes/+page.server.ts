import { avg, count, desc, eq, sql } from 'drizzle-orm';
import { createDB } from '$lib/server/db/index.js';
import { novel, rating } from '$lib/server/db/schema/novel.schema.js';

export const load = async ({ platform }) => {
  const topNovels = await createDB(platform!.env.DB)
    .select({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      genres: novel.genres
    })
    .from(novel)
    .leftJoin(rating, eq(novel.id, rating.novelId))
    .groupBy(novel.id)
    .orderBy(desc(sql`${count(rating.id)} * ${avg(rating.rating)}`))
    .limit(10);

  const hotNovels = await createDB(platform!.env.DB).query.spotlight.findMany();

  return { featured: { hot: hotNovels, top: topNovels } };
};
