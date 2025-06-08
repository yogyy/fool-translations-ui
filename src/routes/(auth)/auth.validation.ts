import { z } from 'zod/v4';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  token: z.string().optional()
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(4, 'Name needs to be at least 4 characters').max(100),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type AuthResponse = { success: true; token: string } | { success: false; error: string };
