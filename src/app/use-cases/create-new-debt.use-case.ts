import { DebtEntity } from 'src/domain/entities/debt.entity';
import {
  CreateNewDebtInput,
  ICreateNewDebt,
} from 'src/domain/contracts/create-new-debt.interface';
import { IDebtRepository } from '../contracts/debt-repository.interface';

export class CreateNewDebtUseCase implements ICreateNewDebt {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(input: CreateNewDebtInput): Promise<DebtEntity> {
    const debt = DebtEntity.create(input);

    await this.debtRepository.save(debt);

    return debt;
  }
}
