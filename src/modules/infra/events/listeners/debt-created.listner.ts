import { OnEvent } from '@nestjs/event-emitter';
import { DebtCreatedEventDto } from 'src/modules/core/dtos/debt-created-event.dto';

export class DebtCreatedListener {
  constructor() {}

  @OnEvent('debt.created')
  handleOrderCreatedEvent(payload: DebtCreatedEventDto) {
    console.log('Event received: debt.created', payload.debtId);
  }
}
