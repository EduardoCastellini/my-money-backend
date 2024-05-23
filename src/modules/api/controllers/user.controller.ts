import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { IUserRegister } from 'src/modules/core/domain/contracts/user-register.interface';
import { Public } from 'src/modules/infra/decorators/public.decorator';
import { ZodValidationPipe } from 'src/modules/infra/pipes/zod-validation.pipe';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { userRegisterSchema } from 'src/modules/infra/zod-schema-validation/user-register.chema';
import { ServiceProviders } from 'src/modules/core/service-providers.enum';

@Controller('user')
export class UserController {
  constructor(
    @Inject(ServiceProviders.UserRegister)
    private registerService: IUserRegister,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  @UsePipes(new ZodValidationPipe(userRegisterSchema))
  async login(@Body() registerDto: RegisterUserDto) {
    const username = await this.registerService.execute(registerDto);

    return { name: username };
  }
}
