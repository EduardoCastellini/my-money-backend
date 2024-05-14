import { DebtEntity } from '../entities/debt.entity';

export interface IPaidDebt {
  execute(debt: string): Promise<DebtEntity>;
}
