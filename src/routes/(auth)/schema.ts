import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerSchema = loginSchema
  .extend({ name: z.string(), confirmPassword: z.string().min(8) })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type AuthResponse = { success: true; token: string } | { success: false; error: string };
