import { z } from 'zod';

export const novelSchema = z.object({
  title: z.string().min(3),
  synopsis: z.string().min(10),
  author: z.string(),
  genres: z.string().includes(','),
  cover: z.string().url().optional().or(z.literal('')),
  banner: z.string().url().optional().or(z.literal(''))
});

export type FormSchema = typeof novelSchema;
