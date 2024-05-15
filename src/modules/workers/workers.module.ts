import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { CoreModule } from '../core/core.module';
import { DebtConsumer } from './consumers/debt-consumer';
import { RepositoryProviders } from 'src/providers/repository-provider.enum';
import { DebtRepository } from '../infra/db/repositories/debt.repository';

@Module({
  imports: [InfraModule, CoreModule],
  providers: [
    {
      provide: 'DebtConsumer',
      useFactory: (debtRepository: DebtRepository) => {
        return new DebtConsumer(debtRepository);
      },
      inject: [RepositoryProviders.IDebtRepository],
    },
  ],
})
export class WorkersModule {}
