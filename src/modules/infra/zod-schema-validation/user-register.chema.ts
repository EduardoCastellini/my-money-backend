import { z } from 'zod';

export const userRegisterSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
    // .refine((data) => data === this.password, {
    //   message: 'Password confirmation does not match',
    // }),
  })
  .required();

export type UserRegisterDto = z.infer<typeof userRegisterSchema>;
