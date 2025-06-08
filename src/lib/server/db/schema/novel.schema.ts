import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, unique } from 'drizzle-orm/sqlite-core';
import { user } from './user.schema';

export const novel = sqliteTable(
  'novel',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    genres: text('genres', { mode: 'json' })
      .$type<string[]>()
      .default(sql`(json_array())`),
    synopsis: text('synopsis').notNull(),
    cover: text('cover'),
    banner: text('banner'),
    totalViews: integer('total_views').default(0),
    status: text('status', { enum: ['ongoing', 'completed'] }).default('ongoing'),
    publishedAt: text('published_at')
      .default(sql`(current_timestamp)`)
      .notNull(),
    lastUpdated: text('last_updated')
      .default(sql`(current_timestamp)`)
      .notNull()
  },
  (table) => ({ unq: unique().on(table.author, table.title) })
);

export const chapter = sqliteTable(
  'novel_chapter',
  {
    id: text('id').primaryKey(),
    chapterNum: integer('chapter_number').notNull(),
    title: text('title').notNull(),
    createdAt: text('created_at')
      .default(sql`(current_timestamp)`)
      .notNull(),
    content: text('content').notNull(),
    novelId: text('novel_id')
      .references(() => novel.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => ({ unq: unique().on(table.novelId, table.chapterNum) })
);

export const rating = sqliteTable(
  'novel_rating',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    novelId: text('novel_id')
      .references(() => novel.id, { onDelete: 'cascade' })
      .notNull(),
    userId: text('user_id')
      .references(() => user.id)
      .notNull(),
    rating: real('rating').notNull(),
    createdAt: text('created_at')
      .default(sql`(current_timestamp)`)
      .notNull()
  },
  (table) => ({ unq: unique().on(table.novelId, table.userId) })
);

export const spotlight = sqliteTable('novel_spotlight', {
  id: integer('id').primaryKey(),
  image: text('image').notNull(),
  createdAt: text('created_at')
    .default(sql`(current_timestamp)`)
    .notNull(),
  novelId: text('novel_id')
    .references(() => novel.id, { onDelete: 'cascade' })
    .notNull()
});

export const favorite = sqliteTable(
  'novel_favorite',
  {
    id: integer('id').primaryKey(),
    createdAt: text('created_at')
      .default(sql`(current_timestamp)`)
      .notNull(),
    userId: text('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    novelId: text('novel_id')
      .references(() => novel.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => ({ unq: unique().on(table.novelId, table.userId) })
);

export const subscribe = sqliteTable(
  'novel_subscribe',
  {
    id: integer('id').primaryKey(),
    createdAt: text('created_at')
      .default(sql`(current_timestamp)`)
      .notNull(),
    userId: text('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    novelId: text('novel_id')
      .references(() => novel.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => ({ unq: unique().on(table.novelId, table.userId) })
);

export const novelRelations = relations(novel, ({ many }) => ({
  chapters: many(chapter),
  rating: many(rating)
}));

export const chapterRelations = relations(chapter, ({ one }) => ({
  novel: one(novel, {
    fields: [chapter.novelId],
    references: [novel.id]
  })
}));

export const ratingRelations = relations(rating, ({ one }) => ({
  novel: one(novel, {
    fields: [rating.novelId],
    references: [novel.id]
  })
}));

export const spotlightRelation = relations(spotlight, ({ one }) => ({
  novel: one(novel, {
    fields: [spotlight.novelId],
    references: [novel.id]
  })
}));

export type Novel = typeof novel.$inferInsert;
export type Chapter = typeof chapter.$inferInsert;
export type Spotlight = typeof spotlight.$inferInsert;
