import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('debt')
export class DebtConsumer {
  @Process('process')
  async process(job: Job<unknown>) {
    console.log(job.data);

    return {
      message: 'Debt processed',
    };
  }
}
