import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import config from 'src/config/config';
import { DebtRepository } from 'src/modules/infra/db/repositories/debt.repository';
import { PrismaService } from 'src/modules/infra/db/prisma.service';
import { UserRepository } from './db/repositories/user.repository';
import { AuthGuard } from './guards/auth.guard';
import { HashAdapter } from './adapters/hash.adapter';
import { JwtAdapter } from './adapters/jwt.adapter';
import { DebtQueueProducer } from './producers/debt-queue.producer';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterService } from './events/event-emitter.service';
import { DebtCreatedListener } from './events/listeners/debt-created.listner';

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
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'debt',
      adapter: BullAdapter,
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
    JwtAdapter,
    HashAdapter,
    DebtQueueProducer,
    DebtCreatedListener,
    EventEmitterService,
    UserRepository,
    DebtRepository,
  ],

  exports: [
    UserRepository,
    DebtRepository,
    JwtAdapter,
    HashAdapter,
    EventEmitterService,
    DebtQueueProducer,
  ],
})
export class InfraModule {}
