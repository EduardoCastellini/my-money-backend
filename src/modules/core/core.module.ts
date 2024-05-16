import { Module } from '@nestjs/common';
import { CreateNewDebtUseCase } from 'src/modules/core/use-cases/create-new-debt.use-case';
import { ListMonthlyDebtsUseCase } from 'src/modules/core/use-cases/list-monthly-debts.use-case';
import { DebtRepository } from 'src/modules/infra/db/repositories/debt.repository';
import { ServiceProviders } from 'src/providers/service-providers.enum';
import { PaidDebtUseCase } from 'src/modules/core/use-cases/paid-debt.use-case';
import { HashAdapter } from 'src/modules/infra/adapters/hash.adapter';
import { UserRepository } from 'src/modules/infra/db/repositories/user.repository';
import { UserRegisterUseCase } from './use-cases/user-register.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { JwtAdapter } from 'src/modules/infra/adapters/jwt.adapter';
import { InfraModule } from 'src/modules/infra/infra.module';
import { DebtQueueProducer } from '../infra/producers/debt-queue.producer';
import { IEventEmitterService } from './contracts/event-emitter-service.interface';
import { EventEmitterService } from '../infra/events/event-emitter.service';

@Module({
  imports: [InfraModule],

  providers: [
    {
      provide: ServiceProviders.SignIn,
      useFactory: (
        userRepository: UserRepository,
        jwtAdapter: JwtAdapter,
        hashAdapter: HashAdapter,
      ) => {
        return new SignInUseCase(userRepository, hashAdapter, jwtAdapter);
      },
      inject: [UserRepository, JwtAdapter, HashAdapter],
    },

    {
      provide: ServiceProviders.CreateNewDebt,
      useFactory: (
        debtRepository: DebtRepository,
        debtQueueProducer: DebtQueueProducer,
        eventEmitter: IEventEmitterService,
      ) => {
        return new CreateNewDebtUseCase(
          eventEmitter,
          debtQueueProducer,
          debtRepository,
        );
      },
      inject: [DebtRepository, DebtQueueProducer, EventEmitterService],
    },

    {
      provide: ServiceProviders.ListMonthlyDebts,
      useFactory: (debtRepository: DebtRepository) => {
        return new ListMonthlyDebtsUseCase(debtRepository);
      },
      inject: [DebtRepository],
    },

    {
      provide: ServiceProviders.PaidDebt,
      useFactory: (debtRepository: DebtRepository) => {
        return new PaidDebtUseCase(debtRepository);
      },
      inject: [DebtRepository],
    },

    {
      provide: ServiceProviders.UserRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashAdapter: HashAdapter,
      ) => {
        return new UserRegisterUseCase(userRepository, hashAdapter);
      },
      inject: [UserRepository, HashAdapter],
    },
  ],

  exports: [
    ServiceProviders.SignIn,
    ServiceProviders.CreateNewDebt,
    ServiceProviders.ListMonthlyDebts,
    ServiceProviders.PaidDebt,
    ServiceProviders.UserRegisterService,
  ],
})
export class CoreModule {}
