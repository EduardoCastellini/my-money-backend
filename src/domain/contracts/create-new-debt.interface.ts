import { DebtEntity } from '../entities/debt.entity';

export type CreateNewDebtInput = {
  description: string;
  amount: number;
  dueDate: Date;
  tags?: string[];
};

export interface ICreateNewDebt {
  execute(input: CreateNewDebtInput): Promise<DebtEntity>;
}
