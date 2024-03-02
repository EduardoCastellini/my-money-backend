import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { IUserRegisterService } from 'src/domain/contracts/user-register.interface';
import { Public } from 'src/infra/decorators/public.decorator';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import { ServicesProviders } from 'src/main/providers.enum';
import { RegisterDto } from '../dtos/register.dto';
import { userRegisterSchema } from 'src/infra/zod-schema-validation/user-register.chema';

@Controller('user')
export class UserController {
  constructor(
    @Inject(ServicesProviders.IUserRegisterService)
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
