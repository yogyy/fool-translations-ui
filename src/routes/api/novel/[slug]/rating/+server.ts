import { createDB } from '$lib/server/db';
import { rating } from '$lib/server/db/schema/novel.schema';
import { IdValidLength } from '$lib/server/validation';
import { FOREIGN_KEY_CONSTRAINT, UNIQUE_CONSTRAINT } from '$lib/server/utils';
import { json, type RequestHandler } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod/v4';

const RatingSchema = z.object({
  rating: z.number().min(1).max(5)
});

export const GET: RequestHandler = async ({ locals, params, platform }) => {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

  const valid = IdValidLength.safeParse(params);
  if (!valid.success) {
    return json({ error: 'Bad Request' }, { status: 400 });
  }

  const novelId = `nvl_${valid.data.slug}`;
  try {
    const db = createDB(platform!.env.DB);
    const userRating = await db.query.rating.findFirst({
      where: and(eq(rating.novelId, novelId), eq(rating.userId, locals.user.id))
    });

    if (!userRating) return json({ success: true, data: { isRated: true, rating: 0 } });

    return json({ success: true, data: { isRated: true, rating: userRating.rating } });
  } catch (err) {
    console.error(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ locals, request, params, platform }) => {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });

  const paramsValid = IdValidLength.safeParse(params);
  if (!paramsValid.success) return json({ error: 'Bad Request' }, { status: 400 });

  const bodyValid = RatingSchema.safeParse(await request.json());
  if (!bodyValid.success) return json({ error: 'Bad Request' }, { status: 400 });

  const novelId = `nvl_${paramsValid.data.slug}`;
  const dataReturned = { novelId: rating.novelId, userId: rating.userId, rate: rating.rating };
  try {
    const [newRating] = await createDB(platform!.env.DB)
      .insert(rating)
      .values({ userId: locals.user.id, novelId, rating: bodyValid.data.rating })
      .returning(dataReturned);

    return json({ success: true, message: 'Rating submitted successfully', data: newRating });
  } catch (err: any) {
    if (String(err.cause).includes(FOREIGN_KEY_CONSTRAINT)) {
      return json({ success: false, error: 'Novel Not Found' }, { status: 404 });
    }
    if (String(err.cause).includes(UNIQUE_CONSTRAINT)) {
      const [updateRating] = await createDB(platform!.env.DB)
        .update(rating)
        .set({ rating: bodyValid.data.rating })
        .where(and(eq(rating.novelId, novelId), eq(rating.userId, locals.user.id)))
        .returning(dataReturned);

      return json({
        success: true,
        message: 'Rating updated successfully',
        data: updateRating
      });
    }

    console.error(err);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
