import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { CoreModule } from '../core/core.module';
import { DebtConsumer } from './consumers/debt-consumer';
import { DebtRepository } from '../infra/db/repositories/debt.repository';

@Module({
  imports: [InfraModule, CoreModule],

  providers: [
    {
      provide: 'DebtConsumer',
      useFactory: (debtRepository: DebtRepository) => {
        return new DebtConsumer(debtRepository);
      },
      inject: [DebtRepository],
    },
  ],
})
export class WorkersModule {}
