import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UsePipes,
} from '@nestjs/common';
import { ICreateNewDebt } from 'src/domain/contracts/create-new-debt.interface';
import { IListMonthlyDebts } from 'src/domain/contracts/list-monthly-debts.interface';
import { IPaidDebt } from 'src/domain/contracts/paid-debt.interface';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import { createDebtSchema } from 'src/infra/zod-schema-validation/create-debt.chema';
import { ServicesProviders } from 'src/main/providers.enum';
import { CreateDebtDto } from 'src/presentation/dtos/create-debt.dto';

@Controller('debt')
export class DebtController {
  constructor(
    @Inject(ServicesProviders.ICreateNewDebt)
    private readonly createNewDebt: ICreateNewDebt,

    @Inject(ServicesProviders.IListMonthlyDebts)
    private readonly listMonthlyDebts: IListMonthlyDebts,

    @Inject(ServicesProviders.IPaidDebt)
    private readonly paidDebt: IPaidDebt,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDebtSchema))
  async createDebt(
    @Body()
    createDebtDto: CreateDebtDto,
    @Request()
    { user }: { user: any },
  ): Promise<string> {
    const userId = user.userId;

    await this.createNewDebt.execute({ ...createDebtDto, userId });

    return 'Debt created';
  }

  @Get('list-debts/:month')
  async debts(@Param('month') month: number): Promise<unknown> {
    return await this.listMonthlyDebts.execute(month);
  }

  @Post('/pay/:debtId')
  async paid(@Param('debtId') debtId: string): Promise<string> {
    await this.paidDebt.execute(debtId);

    return 'Debt paid';
  }
}
