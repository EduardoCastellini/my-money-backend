import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IDebtQueueProducer } from 'src/modules/core/contracts/debt-queue-producer.interface';

@Injectable()
export class DebtQueueProducer implements IDebtQueueProducer {
  constructor(@InjectQueue('debt') private debtQueue: Queue) {}

  async add(name: string, data: unknown, options?: unknown): Promise<unknown> {
    return this.debtQueue.add(name, data, options);
  }
}
