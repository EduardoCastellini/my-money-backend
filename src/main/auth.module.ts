import { Module } from '@nestjs/common';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { RepositoriesProviders, ServicesProviders } from './providers.enum';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { SignInUseCase } from 'src/app/use-cases/sign-in.use-case';
import { UsersModule } from './users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAdapter } from 'src/infra/adapters/jwt.adapter';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { HashAdapter } from 'src/infra/adapters/hash.adapter';
import { PrismaService } from 'src/infra/db/prisma.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secretKey', // TODO: use process.env.JWT_SECRET
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: RepositoriesProviders.IUserRepository,
      useFactory: (prismaService: PrismaService) => {
        return new UserRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ServicesProviders.IJwtService,
      useFactory: (jwtService: JwtService) => {
        return new JwtAdapter(jwtService);
      },
      inject: [JwtService],
    },
    {
      provide: ServicesProviders.IHashService,
      useClass: HashAdapter,
    },
    {
      provide: ServicesProviders.ISignIn,
      useFactory: (
        userRepository: UserRepository,
        jwtAdapter: JwtAdapter,
        hashAdapter: HashAdapter,
      ) => {
        return new SignInUseCase(userRepository, hashAdapter, jwtAdapter);
      },
      inject: [
        RepositoriesProviders.IUserRepository,
        ServicesProviders.IJwtService,
        ServicesProviders.IHashService,
      ],
    },
  ],
  exports: [],
})
export class AuthModule {}
