import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventEmitterService } from 'src/modules/core/contracts/event-emitter-service.interface';

export class EventEmitterService implements IEventEmitterService {
  constructor(@Inject(EventEmitter2) private eventEmitter: EventEmitter2) {}

  emit(event: string, payload: any): void {
    console.log('Event emitted:', event, payload.uuid);

    this.eventEmitter.emit(event, payload);
  }
}
