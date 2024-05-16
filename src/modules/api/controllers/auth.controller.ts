import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ISignIn } from 'src/modules/core/domain/contracts/sign-in.interface';
import { ZodValidationPipe } from 'src/modules/infra/pipes/zod-validation.pipe';
import {
  SignInSchema,
  SignInDto,
} from 'src/modules/infra/zod-schema-validation/sign-in.chema';
import { Public } from 'src/modules/infra/decorators/public.decorator';
import { ServiceProviders } from 'src/providers/service-providers.enum';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ServiceProviders.SignIn)
    private signIn: ISignIn,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @UsePipes(new ZodValidationPipe(SignInSchema))
  login(@Body() signInDto: SignInDto) {
    return this.signIn.execute(signInDto.email, signInDto.password);
  }
}
