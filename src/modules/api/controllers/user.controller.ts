import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { IUserRegisterService } from 'src/modules/core/domain/contracts/user-register.interface';
import { Public } from 'src/modules/infra/decorators/public.decorator';
import { ZodValidationPipe } from 'src/modules/infra/pipes/zod-validation.pipe';
import { RegisterDto } from '../dtos/register.dto';
import { userRegisterSchema } from 'src/modules/infra/zod-schema-validation/user-register.chema';
import { ServiceProviders } from 'src/providers/service-providers.enum';

@Controller('user')
export class UserController {
  constructor(
    @Inject(ServiceProviders.IUserRegisterService)
    private registerService: IUserRegisterService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  @UsePipes(new ZodValidationPipe(userRegisterSchema))
  async login(@Body() registerDto: RegisterDto) {
    const username = await this.registerService.execute(registerDto);

    return { name: username };
  }
}
