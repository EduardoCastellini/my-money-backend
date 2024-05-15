import { Module } from '@nestjs/common';
import { CreateNewDebtUseCase } from 'src/modules/core/use-cases/create-new-debt.use-case';
import { ListMonthlyDebtsUseCase } from 'src/modules/core/use-cases/list-monthly-debts.use-case';
import { DebtRepository } from 'src/modules/infra/db/repositories/debt.repository';
import { ServiceProviders } from 'src/providers/service-providers.enum';
import { RepositoryProviders } from 'src/providers/repository-provider.enum';
import { PaidDebtUseCase } from 'src/modules/core/use-cases/paid-debt.use-case';
import { HashAdapter } from 'src/modules/infra/adapters/hash.adapter';
import { UserRepository } from 'src/modules/infra/db/repositories/user.repository';
import { UserRegisterUseCase } from './use-cases/user-register.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { JwtAdapter } from 'src/modules/infra/adapters/jwt.adapter';
import { InfraModule } from 'src/modules/infra/infra.module';
import { ProducerProviders } from 'src/providers/producer-provider.enum';
import { DebtQueueProducer } from '../infra/producers/debt-queue-producer';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: ServiceProviders.ISignIn,
      useFactory: (
        userRepository: UserRepository,
        jwtAdapter: JwtAdapter,
        hashAdapter: HashAdapter,
      ) => {
        return new SignInUseCase(userRepository, hashAdapter, jwtAdapter);
      },
      inject: [
        RepositoryProviders.IUserRepository,
        ServiceProviders.IJwtService,
        ServiceProviders.IHashService,
      ],
    },
    {
      provide: ServiceProviders.ICreateNewDebt,
      useFactory: (
        debtQueueProducer: DebtQueueProducer,
        debtRepository: DebtRepository,
      ) => {
        return new CreateNewDebtUseCase(debtQueueProducer, debtRepository);
      },
      inject: [
        ProducerProviders.IDebtQueueProducer,
        RepositoryProviders.IDebtRepository,
      ],
    },
    {
      provide: ServiceProviders.IListMonthlyDebts,
      useFactory: (debtRepository: DebtRepository) => {
        return new ListMonthlyDebtsUseCase(debtRepository);
      },
      inject: [RepositoryProviders.IDebtRepository],
    },
    {
      provide: ServiceProviders.IPaidDebt,
      useFactory: (debtRepository: DebtRepository) => {
        return new PaidDebtUseCase(debtRepository);
      },
      inject: [RepositoryProviders.IDebtRepository],
    },
    {
      provide: ServiceProviders.IUserRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashAdapter: HashAdapter,
      ) => {
        return new UserRegisterUseCase(userRepository, hashAdapter);
      },
      inject: [
        RepositoryProviders.IUserRepository,
        ServiceProviders.IHashService,
      ],
    },
  ],
  exports: [
    ServiceProviders.ISignIn,
    ServiceProviders.ICreateNewDebt,
    ServiceProviders.IListMonthlyDebts,
    ServiceProviders.IPaidDebt,
    ServiceProviders.IUserRegisterService,
  ],
})
export class CoreModule {}
