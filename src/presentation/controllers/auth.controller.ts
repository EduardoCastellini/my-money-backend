import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ISignIn } from 'src/domain/contracts/sign-in.interface';
import { ServicesProviders } from 'src/main/providers.enum';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import {
  SignInSchema,
  SignInDto,
} from 'src/infra/zod-schema-validation/sign-in.chema';
import { Public } from 'src/infra/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ServicesProviders.ISignIn)
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
