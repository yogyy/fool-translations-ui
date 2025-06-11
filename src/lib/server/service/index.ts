import type { z } from 'zod/v4';
import { eq, sql } from 'drizzle-orm';
import { createDB } from '../db';
import { generateRandId } from '../utils';
import { chapter, novel, subscribe } from '../db/schema/novel.schema';
import { notification, type Notification } from '../db/schema/notification.schema';
import { chapterPayload, editNovelPayload, novelPayload } from '../validation';

export async function addNewNovel(env: Env, body: z.infer<typeof novelPayload>) {
  const [data] = await createDB(env.DB)
    .insert(novel)
    .values({ id: generateRandId('nvl'), ...body })
    .returning();

  return data;
}

export async function updateNovel(env: Env, body: z.infer<typeof editNovelPayload>, id: string) {
  const [data] = await createDB(env.DB)
    .update(novel)
    .set({ ...body, lastUpdated: sql`(current_timestamp)` })
    .where(eq(novel.id, id))
    .returning();

  return data;
}

export async function deleteNovel(env: Env, id: string) {
  const [data] = await createDB(env.DB)
    .delete(novel)
    .where(eq(novel.id, id))
    .returning({ id: novel.id });

  return data;
}

export async function getNovel(env: Env, novelId: string, returning = true) {
  return await createDB(env.DB).query.novel.findFirst({
    where: eq(novel.id, novelId),
    columns: returning ? undefined : { id: true }
  });
}

export async function addChapter(env: Env, body: z.infer<typeof chapterPayload>) {
  const [data] = await createDB(env.DB)
    .insert(chapter)
    .values({ id: generateRandId('ch'), ...body })
    .returning();

  return data;
}

export async function updateLastUpdatedForNovel(env: Env, novelId: string) {
  return await createDB(env.DB)
    .update(novel)
    .set({ lastUpdated: sql`(current_timestamp)` })
    .where(eq(novel.id, novelId));
}

export async function notifySubscribers(env: Env, novelId: string) {
  const userSubs = await createDB(env.DB).query.subscribe.findMany({
    where: eq(subscribe.novelId, novelId),
    columns: { userId: true }
  });

  if (userSubs.length > 0) {
    await createDB(env.DB)
      .insert(notification)
      .values(
        userSubs.map((item) => ({
          id: generateRandId('ntf'),
          userId: item.userId,
          novelId: novelId,
          type: 'new_chapter'
        })) as Notification[]
      );
  }
}

const updateChSchema = chapterPayload.omit({ novelId: true });
export async function updateChapter(env: Env, body: z.infer<typeof updateChSchema>, id: string) {
  const [data] = await createDB(env.DB)
    .update(chapter)
    .set({ ...body })
    .where(eq(chapter.id, id))
    .returning();

  return data;
}

export async function deleteChapter(env: Env, id: string) {
  const [data] = await createDB(env.DB)
    .delete(chapter)
    .where(eq(chapter.id, id))
    .returning({ id: chapter.id });

  return data;
}
