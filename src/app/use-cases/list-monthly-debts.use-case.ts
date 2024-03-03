import { IListMonthlyDebts } from 'src/domain/contracts/list-monthly-debts.interface';
import { IDebtRepository } from '../contracts/debt-repository.interface';
import { DebtProps } from 'src/domain/entities/debt.entity';

export class ListMonthlyDebtsUseCase implements IListMonthlyDebts {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(month: number): Promise<DebtProps[]> {
    const debts = await this.debtRepository.findByMonth(month);

    return debts.map((debt) => debt.toJSON());
  }
}
