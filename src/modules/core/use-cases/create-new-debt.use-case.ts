import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';
import { IDebtRepository } from '../contracts/debt-repository.interface';
import { IEventEmitterService } from '../contracts/event-emitter-service.interface';
import {
  CreateNewDebtInput,
  ICreateNewDebt,
} from 'src/modules/core/domain/contracts/create-new-debt.interface';

export class CreateNewDebtUseCase implements ICreateNewDebt {
  constructor(
    private readonly eventEmitterService: IEventEmitterService,
    private readonly debtRepository: IDebtRepository,
  ) {}

  async execute(input: CreateNewDebtInput): Promise<DebtEntity> {
    const debt = DebtEntity.create(input);

    const debtCreated = await this.debtRepository.save(debt);

    this.eventEmitterService.emit('debt.created', debtCreated);

    return debt;
  }
}
