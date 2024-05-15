import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { CoreModule } from '../core/core.module';
import { DebtConsumer } from './consumers/debt-consumer';

@Module({
  imports: [InfraModule, CoreModule],
  providers: [DebtConsumer],
})
export class WorkersModule {}
