import { z } from 'zod';

export const createDebtSchema = z
  .object({
    description: z.string().min(3).max(255),
    amount: z.number().nonnegative(),
    dueDate: z.coerce.date(),
    tags: z.array(z.string()),
  })
  .required();

export type CreateDebtDto = z.infer<typeof createDebtSchema>;
