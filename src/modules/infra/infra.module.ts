import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DebtRepository } from 'src/modules/infra/db/repositories/debt.repository';
import { PrismaService } from 'src/modules/infra/db/prisma.service';
import { UserRepository } from './db/repositories/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { HashAdapter } from './adapters/hash.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config/config';
import { ServiceProviders } from 'src/providers/service-providers.enum';
import { RepositoryProviders } from 'src/providers/repository-provider.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: RepositoryProviders.IUserRepository,
      useFactory: (prismaService: PrismaService) => {
        return new UserRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: RepositoryProviders.IDebtRepository,
      useFactory: (prismaService: PrismaService) => {
        return new DebtRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ServiceProviders.IHashService,
      useClass: HashAdapter,
    },
    {
      provide: ServiceProviders.IJwtService,
      useFactory: (jwtService: JwtService) => {
        return new JwtAdapter(jwtService);
      },
      inject: [JwtService],
    },
  ],
  exports: [
    RepositoryProviders.IUserRepository,
    RepositoryProviders.IDebtRepository,
    ServiceProviders.IHashService,
    ServiceProviders.IJwtService,
  ],
})
export class InfraModule {}
