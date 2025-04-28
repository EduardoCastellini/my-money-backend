import { IncomeEntity } from 'src/modules/core/domain/entities/income.entity';

export interface IIncomeRepository {
  save(income: IncomeEntity): Promise<IncomeEntity>;
}
