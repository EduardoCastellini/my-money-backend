import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';
import { IDebtRepository } from '../contracts/debt-repository.interface';
import { IDebtQueueProducer } from '../contracts/debt-queue-producer.interface';
import { IEventEmitterService } from '../contracts/event-emitter-service.interface';
import { DebtCreatedEventDto } from '../dtos/debt-created-event.dto';
import {
  CreateNewDebtInput,
  ICreateNewDebt,
} from 'src/modules/core/domain/contracts/create-new-debt.interface';

export class CreateNewDebtUseCase implements ICreateNewDebt {
  constructor(
    private readonly eventEmitterService: IEventEmitterService,
    private readonly debtQueueProducer: IDebtQueueProducer,
    private readonly debtRepository: IDebtRepository,
  ) {}

  async execute(input: CreateNewDebtInput): Promise<DebtEntity> {
    const debt = DebtEntity.create(input);

    await this.debtRepository.save(debt);

    // Add the debt to the queue to be processed and emit an event (testing)
    await this.debtQueueProducer.add('process', debt, {
      delay: 5000,
    });

    this.eventEmitterService.emit(
      'debt.created',
      new DebtCreatedEventDto(debt.id, debt.description, debt.amount),
    );

    return debt;
  }
}
