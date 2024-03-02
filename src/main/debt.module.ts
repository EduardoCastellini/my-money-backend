import { Module } from '@nestjs/common';
import { CreateNewDebtUseCase } from 'src/app/use-cases/create-new-debt.use-case';
import { ListDebtsUseCase } from 'src/app/use-cases/list-debts.use-case';
import { DebtRepository } from 'src/infra/db/repositories/debt.repository';
import { DebtController } from 'src/presentation/controllers/debt.controller';
import { ServicesProviders, RepositoriesProviders } from './providers.enum';
import { PaidDebtUseCase } from 'src/app/use-cases/paid-debt.use-case';
import { PrismaService } from 'src/infra/db/prisma.service';

@Module({
  imports: [],
  controllers: [DebtController],
  providers: [
    PrismaService,
    {
      provide: RepositoriesProviders.IDebtRepository,
      useFactory: (prismaService: PrismaService) => {
        return new DebtRepository(prismaService);
      },
      inject: [PrismaService],
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
