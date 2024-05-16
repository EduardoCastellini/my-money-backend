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
import { ICreateNewDebt } from 'src/modules/core/domain/contracts/create-new-debt.interface';
import { IListMonthlyDebts } from 'src/modules/core/domain/contracts/list-monthly-debts.interface';
import { IPaidDebt } from 'src/modules/core/domain/contracts/paid-debt.interface';
import { ZodValidationPipe } from 'src/modules/infra/pipes/zod-validation.pipe';
import { createDebtSchema } from 'src/modules/infra/zod-schema-validation/create-debt.chema';
import { CreateDebtDto } from 'src/modules/api/dtos/create-debt.dto';
import { ServiceProviders } from 'src/providers/service-providers.enum';

@Controller('debt')
export class DebtController {
  constructor(
    @Inject(ServiceProviders.CreateNewDebt)
    private readonly createNewDebt: ICreateNewDebt,

    @Inject(ServiceProviders.ListMonthlyDebts)
    private readonly listMonthlyDebts: IListMonthlyDebts,

    @Inject(ServiceProviders.PaidDebt)
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
