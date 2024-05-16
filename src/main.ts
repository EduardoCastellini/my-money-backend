import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules/api/api.module';
import { WorkersModule } from './modules/worker/worker.module';

async function bootstrap() {
  const role = process.env.CONTAINER_ROLE || 'api';

  await rolesMapBootstrap[role]();

  const logger = new Logger();
  logger.log(`Container role: ${role}`);
}

const rolesMapBootstrap = {
  api: async () => {
    const port = process.env.PORT || 3000;

    const app = await NestFactory.create(ApiModule);

    await app.listen(port);

    return app;
  },

  workers: async () => {
    return await NestFactory.createApplicationContext(WorkersModule);
  },
};

bootstrap();
