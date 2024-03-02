import { Module } from '@nestjs/common';
import { AppController } from '../presentation/controllers/app.controller';
import { DebitModule } from './debt.module';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { PrismaService } from 'src/infra/db/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, DebitModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
