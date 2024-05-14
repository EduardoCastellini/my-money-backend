import { z } from 'zod';

export const SignInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

export type SignInDto = z.infer<typeof SignInSchema>;
