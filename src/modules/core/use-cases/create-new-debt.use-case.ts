import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';
import { IDebtRepository } from '../contracts/debt-repository.interface';
import {
  CreateNewDebtInput,
  ICreateNewDebt,
} from 'src/modules/core/domain/contracts/create-new-debt.interface';
import { IDebtQueueProducer } from '../contracts/debt-queue-producer.interface';

export class CreateNewDebtUseCase implements ICreateNewDebt {
  constructor(
    private readonly debtQueueProducer: IDebtQueueProducer,
    private readonly debtRepository: IDebtRepository,
  ) {}

  async execute(input: CreateNewDebtInput): Promise<DebtEntity> {
    const debt = DebtEntity.create(input);

    await this.debtRepository.save(debt);

    await this.debtQueueProducer.add('process', debt, {
      delay: 5000,
    });

    return debt;
  }
}
