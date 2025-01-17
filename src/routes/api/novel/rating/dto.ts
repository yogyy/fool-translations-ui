import { z } from 'zod';

const CustomID = (param: string, name = 'ID') =>
  z
    .string()
    .min(10, { message: `${name} must be at least 10 characters long.` })
    .max(20, { message: `Invalid ${name}` })
    .startsWith(param, { message: `${name} must start with '${param}'.` });

export const GetRating = z.object({
  novelId: CustomID('nvl_', 'Novel ID')
});

export const RatingDTO = GetRating.extend({
  rating: z.number().min(1).max(10)
});
