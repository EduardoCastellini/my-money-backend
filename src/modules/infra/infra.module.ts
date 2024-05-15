import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import config from 'src/config/config';
import { ServiceProviders } from 'src/providers/service-providers.enum';
import { RepositoryProviders } from 'src/providers/repository-provider.enum';
import { ProducerProviders } from 'src/providers/producer-provider.enum';
import { DebtRepository } from 'src/modules/infra/db/repositories/debt.repository';
import { PrismaService } from 'src/modules/infra/db/prisma.service';
import { UserRepository } from './db/repositories/user.repository';
import { AuthGuard } from './guards/auth.guard';
import { HashAdapter } from './adapters/hash.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { DebtQueueProducer } from './producers/debt-queue-producer';

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
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'debt',
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
    {
      provide: ProducerProviders.IDebtQueueProducer,
      useClass: DebtQueueProducer,
    },
  ],
  exports: [
    RepositoryProviders.IUserRepository,
    RepositoryProviders.IDebtRepository,
    ServiceProviders.IHashService,
    ServiceProviders.IJwtService,
    ProducerProviders.IDebtQueueProducer,
  ],
})
export class InfraModule {}
