import { drizzle } from 'drizzle-orm/d1';
import * as userSchema from './schema/user.schema';
import * as novelSchema from './schema/novel.schema';
import * as ntfSchema from './schema/notification.schema';

export function createDB(d1: D1Database) {
  return drizzle(d1, { schema: { ...novelSchema, ...userSchema, ...ntfSchema } });
}
