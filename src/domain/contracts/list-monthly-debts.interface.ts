import { DebtProps } from '../entities/debt.entity';

export interface IListMonthlyDebts {
  execute(month: number): Promise<DebtProps[]>;
}
