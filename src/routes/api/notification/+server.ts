import { createDB } from '$lib/server/db';
import { notification } from '$lib/server/db/schema/notification.schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z, prettifyError } from 'zod/v4';

const Validation = z.object({
  id: z.string().startsWith('ntf')
});

const notAuthorized = {
  success: false,
  error: 'You are not authorized to access this notification.'
};

export const PATCH: RequestHandler = async ({ locals, request, platform }) => {
  if (!locals.user) {
    return json('Unauthorized', { status: 401 });
  }

  const { success, data, error } = Validation.safeParse(await request.json());
  if (!success) {
    return json(prettifyError(error), { status: 400 });
  }

  const db = createDB(platform!.env.DB);
  const ntf = await db.query.notification.findFirst({ where: eq(notification.id, data.id) });
  if (ntf?.userId !== locals.user.id) return json(notAuthorized, { status: 403 });
  if (ntf.isRead) {
    await db.update(notification).set({ isRead: false }).where(eq(notification.id, data.id));
  } else {
    await db.update(notification).set({ isRead: true }).where(eq(notification.id, data.id));
  }

  return json({ success: true });
};

export const DELETE: RequestHandler = async ({ locals, request, platform }) => {
  if (!locals.user) {
    return json('Unauthorized', { status: 401 });
  }

  const { success, data, error } = Validation.safeParse(await request.json());
  if (!success) {
    return json(prettifyError(error), { status: 400 });
  }

  const db = createDB(platform!.env.DB);
  const ntf = await db.query.notification.findFirst({ where: eq(notification.id, data.id) });
  if (ntf?.userId !== locals.user.id) return json(notAuthorized, { status: 403 });

  await db.delete(notification).where(eq(notification.id, data.id));
  return json({ success: true });
};
