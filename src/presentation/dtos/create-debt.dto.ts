export class CreateDebtDto {
  description: string;
  amount: number;
  dueDate: Date;
  tags?: string[];
}
