import { DebtProps } from '../entities/debt.entity';

export interface IListDebts {
  execute(month: number): Promise<DebtProps[]>;
}
