import { z } from 'zod/v4';

export const novelSchema = z.object({
  title: z.string().min(3).default('testing novel'),
  synopsis: z
    .string()
    .min(10)
    .default(
      '"Penghuni Dunia Lain… kami mohon padamu untuk menyelamatkan dunia kami dari kehancuran."'
    ),
  author: z.string().default('yogyy'),
  publishedAt: z.iso.date().default('2025-06-07'),
  genres: z.string().includes(',').default('Action,Adventure,Drama,Fantasy'),
  cover: z.url().optional().or(z.literal('')),
  banner: z.url().optional().or(z.literal(''))
});

export type NovelSchema = typeof novelSchema;

export const chapterSchema = z.object({
  title: z.string().min(5).default('testing title'),
  novelId: z.string().startsWith('nvl'),
  chapterNum: z.coerce.number().min(1).default(1),
  content: z.string().min(2).default('test')
});

export type ChapterSchema = typeof chapterSchema;

export const updateNovelSchema = novelSchema.extend({
  id: z.string()
});

export type UpdateNovelSchema = typeof updateNovelSchema;
