import { Module } from '@nestjs/common';
import { UserController } from 'src/presentation/controllers/user.controller';
import { RepositoriesProviders, ServicesProviders } from './providers.enum';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { UserRegisterUseCase } from 'src/app/use-cases/user-register.use-case';
import { HashAdapter } from 'src/infra/adapters/hash.adapter';
import { PrismaService } from 'src/infra/db/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: RepositoriesProviders.IUserRepository,
      useFactory: (prismaService: PrismaService) => {
        return new UserRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ServicesProviders.IHashService,
      useClass: HashAdapter,
    },
    {
      provide: ServicesProviders.IUserRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashAdapter: HashAdapter,
      ) => {
        return new UserRegisterUseCase(userRepository, hashAdapter);
      },
      inject: [
        RepositoriesProviders.IUserRepository,
        ServicesProviders.IHashService,
      ],
    },
  ],
})
export class UsersModule {}
