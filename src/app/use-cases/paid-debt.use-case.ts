import { DebtEntity } from 'src/domain/entities/debt.entity';
import { IDebtRepository } from '../contracts/debt-repository.interface';
import { IPaidDebt } from 'src/domain/contracts/paid-debt.interface';

export class PaidDebtUseCase implements IPaidDebt {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(debtId: string): Promise<DebtEntity> {
    const debtEntity = await this.debtRepository.findOne(debtId);

    debtEntity.payDebt();

    return this.debtRepository.update(debtEntity);
  }
}
