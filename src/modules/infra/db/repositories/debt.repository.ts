import { IDebtRepository } from 'src/modules/core/contracts/debt-repository.interface';
import { DebtEntity } from 'src/modules/core/domain/entities/debt.entity';
import { PrismaService } from '../prisma.service';
import { DebtStatus } from 'src/modules/core/domain/enums/debt-status.enum';
import { Inject } from '@nestjs/common';

export class DebtRepository implements IDebtRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async save(debt: DebtEntity): Promise<DebtEntity> {
    const debtCreated = await this.prisma.debts.create({
      data: {
        uuid: debt.uuid,
        description: debt.description,
        amount: debt.amount,
        status: debt.status,
        dueDate: debt.dueDate,
        tags: debt.tags.toString(),
        userId: debt.userId,
        createdAt: debt.created_at,
      },
    });

    return new DebtEntity({
      id: debtCreated.id,
      uuid: debtCreated.uuid,
      description: debtCreated.description,
      amount: debtCreated.amount,
      status:
        debtCreated.status === 'PENDING' ? DebtStatus.PENDING : DebtStatus.PAID,
      dueDate: debtCreated.dueDate,
      userId: debtCreated.userId,
      createdAt: debtCreated.createdAt,
    });
  }

  async findOne(debtId: string): Promise<DebtEntity> {
    const debt = await this.prisma.debts.findUnique({
      where: {
        uuid: debtId,
      },
    });

    if (!debt) {
      throw new Error('Debt not found');
    }

    return new DebtEntity({
      id: debt.id,
      uuid: debt.uuid,
      description: debt.description,
      amount: debt.amount,
      status: debt.status === 'PENDING' ? DebtStatus.PENDING : DebtStatus.PAID,
      dueDate: debt.dueDate,
      userId: debt.userId,
      tags: debt.tags.split(','),
      createdAt: debt.createdAt,
    });
  }

  async findByMonth(month: number): Promise<DebtEntity[]> {
    const debts = await this.prisma.debts.findMany({});

    return debts
      .filter((debt) => debt.dueDate.getMonth() === month - 1)
      .map(
        (debt) =>
          new DebtEntity({
            id: debt.id,
            uuid: debt.uuid,
            description: debt.description,
            amount: debt.amount,
            status:
              debt.status === 'PENDING' ? DebtStatus.PENDING : DebtStatus.PAID,
            paymentDate: debt.paymentDate,
            dueDate: debt.dueDate,
            userId: debt.userId,
            tags: debt.tags.split(','),
            createdAt: debt.createdAt,
          }),
      );
  }

  async update(debt: DebtEntity): Promise<DebtEntity> {
    const debtUpdated = await this.prisma.debts.update({
      where: {
        id: debt.id,
      },
      data: {
        status: debt.status.valueOf(),
        paymentDate: debt.paymentDate,
      },
    });

    return new DebtEntity({
      id: debtUpdated.id,
      uuid: debtUpdated.uuid,
      description: debtUpdated.description,
      amount: debtUpdated.amount,
      status:
        debtUpdated.status === 'PENDING' ? DebtStatus.PENDING : DebtStatus.PAID,
      dueDate: debtUpdated.dueDate,
      userId: debtUpdated.userId,
      createdAt: debtUpdated.createdAt,
    });
  }
}
