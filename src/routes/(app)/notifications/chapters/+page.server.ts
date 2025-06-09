import type { PageServerLoad } from './$types';
import { createDB } from '$lib/server/db';
import { notification } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, platform }) => {
  if (locals.user) {
    const notifications = await createDB(platform!.env.DB).query.notification.findMany({
      where: and(eq(notification.userId, locals.user.id), eq(notification.type, 'new_chapter')),
      columns: { novelId: false },
      with: { novel: { columns: { id: true, cover: true, title: true } } },
      orderBy: (notification, { desc }) => [desc(notification.createdAt)]
    });

    return { chapters: notifications };
  }
};
