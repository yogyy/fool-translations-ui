import { and, count, eq } from 'drizzle-orm';
import { createDB } from '$lib/server/db';
import { favorite } from '$lib/server/db/schema';
import { IdValidLength } from '$lib/server/validation';
import { UNIQUE_CONSTRAINT } from '$lib/server/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params, platform }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    const db = createDB(platform!.env.DB);
    const [totalFav] = await db
      .select({ count: count() })
      .from(favorite)
      .where(eq(favorite.novelId, novelId));

    const noFavorited = json({
      success: true,
      data: { isFavorited: false, total: totalFav.count }
    });

    if (!locals.user) return noFavorited;
    const favorited = await db.query.favorite.findFirst({
      where: and(eq(favorite.novelId, novelId), eq(favorite.userId, locals.user.id))
    });
    if (!favorited) return noFavorited;

    return json({
      success: true,
      data: { isFavorited: true, total: totalFav.count }
    });
  } catch (err) {
    console.error(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ locals, params, platform }) => {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    await createDB(platform!.env.DB).insert(favorite).values({ userId: locals.user.id, novelId });

    return json({ success: true, action: 'added', message: 'Novel added to your favorites' });
  } catch (err: any) {
    if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
      await createDB(platform!.env.DB)
        .delete(favorite)
        .where(and(eq(favorite.novelId, novelId), eq(favorite.userId, locals.user.id)));

      return json({
        success: true,
        action: 'removed',
        message: 'Novel removed from your favorites'
      });
    }

    console.error(err);
    return json({ error: 'Internal Server Errror' }, { status: 500 });
  }
};
