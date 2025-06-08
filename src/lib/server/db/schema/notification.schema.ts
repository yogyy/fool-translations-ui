import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, check, unique } from 'drizzle-orm/sqlite-core';
import { user } from './user.schema';
import { novel } from './novel.schema';

export const notification = sqliteTable(
  'notification',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    novelId: text('novel_id')
      .references(() => novel.id)
      .notNull(),
    type: text('type', { enum: ['new_chapter', 'reply', 'announcement'] }).notNull(),
    isRead: integer('is_read', { mode: 'boolean' }).default(false).notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(current_timestamp)`)
  },
  (table) => ({
    checkConstraint: check(
      `type_check`,
      sql`${table.type} != 'new_chapter' OR ${table.novelId} IS NOT NULL`
    )
  })
);

export const notifyRelation = relations(notification, ({ one }) => ({
  novel: one(novel, {
    fields: [notification.novelId],
    references: [novel.id]
  })
}));

export type Notification = typeof notification.$inferInsert;
