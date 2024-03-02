import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/infra/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  status(): string {
    return 'Service is running!';
  }
}
