import { and, eq } from 'drizzle-orm';
import { createDB } from '../db';
import { user, type User } from '../db/schema/user.schema';

export async function createUser({
  env,
  email,
  id,
  name,
  password = '',
  avatar,
  provider,
  providerId
}: User & { env: Env }) {
  return await createDB(env.DB)
    .insert(user)
    .values({ email, id, name, password, provider, avatar, providerId });
}

export async function findUserByEmail(env: Env, email: string, provider: User['provider']) {
  return await createDB(env.DB).query.user.findFirst({
    where: and(eq(user.email, email.toLowerCase()), eq(user.provider, provider))
  });
}

export async function getUserFromProviderId(env: Env, id: string) {
  return await createDB(env.DB).query.user.findFirst({
    where: eq(user.providerId, id),
    columns: { id: true }
  });
}

export async function deleteUser(env: Env, email: string) {
  await createDB(env.DB).delete(user).where(eq(user.email, email));
}
