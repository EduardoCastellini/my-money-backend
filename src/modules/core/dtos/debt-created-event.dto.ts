export class DebtCreatedEventDto {
  constructor(
    public readonly debtId: string,
    public readonly description: string,
    public readonly amount: number,
  ) {}
}
