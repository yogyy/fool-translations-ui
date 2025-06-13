import { z } from 'zod/v4';

export const novelSchema = z.object({
  title: z.string().nonempty({ error: 'Title Required' }),
  synopsis: z.string().nonempty({ error: 'Synopsis Required' }),
  author: z.string().nonempty({ error: 'Author Required' }),
  publishedAt: z.iso.date(),
  genres: z.string().includes(','),
  cover: z.url().optional().or(z.literal('')),
  banner: z.url().optional().or(z.literal(''))
});

export type NovelSchema = typeof novelSchema;

export const chapterSchema = z.object({
  title: z.string().nonempty({ error: 'Title Required' }),
  novelId: z.string().startsWith('nvl'),
  chapterNum: z.coerce.number().min(1),
  content: z.string().nonempty({ error: 'Content Required' })
});

export type ChapterSchema = typeof chapterSchema;

export const updateNovelSchema = novelSchema.extend({
  id: z.string()
});

export type UpdateNovelSchema = typeof updateNovelSchema;
