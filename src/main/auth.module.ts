import { Module } from '@nestjs/common';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { RepositoriesProviders, ServicesProviders } from './providers.enum';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { SignInUseCase } from 'src/app/use-cases/sign-in.use-case';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: RepositoriesProviders.IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ServicesProviders.ISignIn,
      useFactory: (userRepository: UserRepository) => {
        return new SignInUseCase(userRepository);
      },
      inject: [RepositoriesProviders.IUserRepository],
    },
  ],
  exports: [],
})
export class AuthModule {}
