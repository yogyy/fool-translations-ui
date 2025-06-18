import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import { json, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return json('Unauthorized', { status: 401 });
    }

    await invalidateSession(event.platform!.env.DB, event.locals.session.id);
    deleteSessionTokenCookie(event);

    return { success: true };
  }
} satisfies Actions;
