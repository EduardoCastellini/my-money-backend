import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IIncomeRepository } from 'src/modules/core/contracts/income-repository.interface';
import { IncomeEntity } from 'src/modules/core/domain/entities/income.entity';
import { IncomeStatus } from 'src/modules/core/domain/enums/income-status.enum';

export class IncomeRepository implements IIncomeRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async save(income: IncomeEntity): Promise<IncomeEntity> {
    const incomeCreated = await this.prisma.incomes.create({
      data: {
        uuid: income.uuid,
        description: income.description,
        amount: income.amount,
        status: income.status,
        dueDate: income.dueDate,
        userId: income.userId,
        createdAt: income.created_at,
      },
    });

    return new IncomeEntity({
      id: incomeCreated.id,
      uuid: incomeCreated.uuid,
      description: incomeCreated.description,
      amount: incomeCreated.amount,
      status:
        incomeCreated.status === 'PENDING'
          ? IncomeStatus.PENDING
          : IncomeStatus.RECEIVED,
      dueDate: incomeCreated.dueDate,
      userId: incomeCreated.userId,
      createdAt: incomeCreated.createdAt,
    });
  }
}
