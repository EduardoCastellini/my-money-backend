import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { IDebtRepository } from 'src/modules/core/contracts/debt-repository.interface';
import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';

@Processor('debt')
export class DebtConsumer {
  constructor(private readonly debtRepository: IDebtRepository) {}

  @Process('process')
  async process(job: Job<DebtEntity>) {
    console.log(job.data);

    const result = await this.debtRepository.findOne(job.data.uuid);

    console.log('result: ', result.status);

    return {
      message: 'Debt processed',
    };
  }
}
