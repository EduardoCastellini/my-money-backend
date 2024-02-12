import { IDebtRepository } from 'src/app/contracts/debt-repository.interface';
import { DebtEntity } from 'src/domain/entities/debt.entity';

export class DebtRepository implements IDebtRepository {
  private debts: DebtEntity[] = [];

  async save(debt: DebtEntity): Promise<DebtEntity> {
    this.debts.push(debt);

    return debt;
  }

  async findOne(debtId: string): Promise<DebtEntity> {
    return new Promise((resolve, reject) => {
      const debt = this.debts.find((debt) => debt.id === debtId);
      if (!debt) {
        reject('Debt not found');
      }

      resolve(debt);
    });
  }

  async findByMonth(month: number): Promise<DebtEntity[]> {
    return new Promise((resolve) => {
      resolve(
        this.debts.filter((debt) => debt.dueDate.getMonth() === month - 1),
      );
    });
  }

  async update(debt: DebtEntity): Promise<DebtEntity> {
    const index = this.debts.findIndex((d) => d.id === debt.id);

    this.debts[index] = debt;

    return debt;
  }
}
