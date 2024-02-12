import { Test, TestingModule } from '@nestjs/testing';
import { DebtController } from './debt.controller';

describe('DebtController', () => {
  let controller: DebtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtController],
    }).compile();

    controller = module.get<DebtController>(DebtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
