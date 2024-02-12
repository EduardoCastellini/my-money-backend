import { Module } from '@nestjs/common';
import { CreateNewDebtUseCase } from 'src/app/use-cases/create-new-debt.use-case';
import { ListDebtsUseCase } from 'src/app/use-cases/list-debts.use-case';
import { DebtRepository } from 'src/infra/db/repositories/debt.repository';
import { DebtController } from 'src/presentation/controllers/debt.controller';
import { ServicesProviders, RepositoriesProviders } from './providers.enum';
import { PaidDebtUseCase } from 'src/app/use-cases/paid-debt.use-case';

@Module({
  imports: [],
  controllers: [DebtController],
  providers: [
    {
      provide: RepositoriesProviders.IDebtRepository,
      useClass: DebtRepository,
    },
    {
      provide: ServicesProviders.ICreateNewDebt,
      useFactory: (debtRepository: DebtRepository) => {
        return new CreateNewDebtUseCase(debtRepository);
      },
      inject: [RepositoriesProviders.IDebtRepository],
    },
    {
      provide: ServicesProviders.IListDebts,
      useFactory: (debtRepository: DebtRepository) => {
        return new ListDebtsUseCase(debtRepository);
      },
      inject: [RepositoriesProviders.IDebtRepository],
    },
    {
      provide: ServicesProviders.IPaidDebt,
      useFactory: (debtRepository: DebtRepository) => {
        return new PaidDebtUseCase(debtRepository);
      },
      inject: [RepositoriesProviders.IDebtRepository],
    },
  ],
})
export class DebitModule {}
