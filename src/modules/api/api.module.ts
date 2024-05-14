import { Module } from '@nestjs/common';
import { DebtController } from 'src/modules/api/controllers/debt.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AppController } from './controllers/app.controller';
import { CoreModule } from 'src/modules/core/core.module';
import { InfraModule } from 'src/modules/infra/infra.module';

@Module({
  imports: [InfraModule, CoreModule],
  controllers: [AppController, UserController, AuthController, DebtController],
})
export class ApiModule {}
