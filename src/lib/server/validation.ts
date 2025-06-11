import { z } from 'zod/v4';

export const IdValidLength = z.object({
  slug: z.string().min(16).max(16)
});

const CustomID = (param: string, name = 'ID') =>
  z
    .string()
    .min(10, { message: `${name} must be at least 10 characters long.` })
    .max(20, { message: `Invalid ${name}` })
    .startsWith(param, { message: `${name} must start with '${param}'.` });

export const novelPayload = z.object({
  author: z.string(),
  title: z.string(),
  synopsis: z.string(),
  publishedAt: z.iso.date(),
  genres: z.array(z.string()),
  cover: z.url().optional().or(z.literal('')),
  banner: z.url().optional().or(z.literal(''))
});

export const editNovelPayload = novelPayload.extend({
  status: z.enum(['ongoing', 'completed']).optional()
});

export const chapterPayload = z.object({
  title: z.string(),
  novelId: CustomID('nvl_', 'Novel ID'),
  chapterNum: z.number(),
  content: z.string()
});
