import { z } from 'zod';

export const novelSchema = z.object({
  title: z.string().min(3),
  synopsis: z.string().min(10),
  author: z.string(),
  publishedAt: z.string().date(),
  genres: z.string().includes(','),
  cover: z.string().url().optional().or(z.literal('')),
  banner: z.string().url().optional().or(z.literal(''))
});

export type NovelSchema = typeof novelSchema;

export const chapterSchema = z.object({
  title: z.string(),
  novelId: z.string(),
  chapterNum: z.string().min(1),
  content: z.string().min(200)
});

export type ChapterSchema = typeof chapterSchema;

export const updateNovelSchema = novelSchema.extend({
  id: z.string()
});

export type UpdateNovelSchema = typeof updateNovelSchema;
