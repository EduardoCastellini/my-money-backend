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
import { IListDebts } from 'src/domain/contracts/list-debts.interface';
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

    @Inject(ServicesProviders.IListDebts)
    private readonly listDebts: IListDebts,

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

  @Get('/:month')
  async debts(@Param('month') month: number): Promise<unknown> {
    return await this.listDebts.execute(month);
  }

  @Post('/pay/:debtId')
  async paid(@Param('debtId') debtId: string): Promise<string> {
    await this.paidDebt.execute(debtId);

    return 'Debt paid';
  }
}
