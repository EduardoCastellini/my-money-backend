import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IDebtQueueProducer } from 'src/modules/core/contracts/debt-queue-producer.interface';
import { DebtQueueProducer } from '../../producers/debt-queue.producer';
import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';

export class DebtCreatedListener {
  constructor(
    @Inject(DebtQueueProducer)
    private debtQueueProducer: IDebtQueueProducer,
  ) {}

  @OnEvent('debt.created')
  async handleOrderCreatedEvent(payload: DebtEntity) {
    console.log('Event received: debt.created', payload.uuid);

    await this.debtQueueProducer.add('process', payload, {
      delay: 5000,
    });
  }
}
