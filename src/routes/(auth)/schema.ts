import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  token: z.string().optional()
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(4, 'Name needs to be at least 4 characters')
      .regex(/^[a-zA-Z0-9]+$/, 'name can only contain letters and numbers'),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type AuthResponse = { success: true; token: string } | { success: false; error: string };
