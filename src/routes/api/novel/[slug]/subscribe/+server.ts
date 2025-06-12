import { createDB } from '$lib/server/db';
import { subscribe } from '$lib/server/db/schema/novel.schema';
import { IdValidLength } from '$lib/server/validation';
import { FOREIGN_KEY_CONSTRAINT, UNIQUE_CONSTRAINT } from '$lib/server/utils';
import { json, type RequestHandler } from '@sveltejs/kit';
import { and, count, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, params, platform }) => {
  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;

  try {
    const db = createDB(platform!.env.DB);
    const [totalSubs] = await db
      .select({ count: count() })
      .from(subscribe)
      .where(eq(subscribe.novelId, novelId));

    const noSubs = json({
      success: true,
      data: { isSubscribed: false, total: totalSubs.count }
    });

    if (!locals.user) return noSubs;

    const favorited = await db.query.subscribe.findFirst({
      where: and(eq(subscribe.novelId, novelId), eq(subscribe.userId, locals.user.id))
    });

    if (!favorited) return noSubs;

    return json({
      success: true,
      data: { isSubscribed: true, total: totalSubs.count }
    });
  } catch (err) {
    console.error(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ params, fetch, locals, platform }) => {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    await createDB(platform!.env.DB).insert(subscribe).values({ userId: locals.user.id, novelId });

    return json({ success: true, action: 'added', message: "You've subscribed to this novel" });
  } catch (err: any) {
    if (String(err.cause).includes(FOREIGN_KEY_CONSTRAINT)) {
      return json({ success: false, error: 'Novel Not Found' }, { status: 404 });
    }
    if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
      await createDB(platform!.env.DB)
        .delete(subscribe)
        .where(and(eq(subscribe.novelId, novelId), eq(subscribe.userId, locals.user.id)));

      return json({
        success: true,
        action: 'removed',
        message: "You've unsubscribed from this novel"
      });
    }
    console.log(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
