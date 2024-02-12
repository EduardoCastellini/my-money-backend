import { DebtEntity } from 'src/domain/entities/debt.entity';

export interface IDebtRepository {
  save(debt: DebtEntity): Promise<DebtEntity>;
  findOne(debtId: string): Promise<DebtEntity>;
  findByMonth(month: number): Promise<DebtEntity[]>;
  update(debt: DebtEntity): Promise<DebtEntity>;
}
