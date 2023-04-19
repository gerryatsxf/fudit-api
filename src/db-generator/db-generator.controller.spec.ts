import {Test, TestingModule} from '@nestjs/testing';
import {DbGeneratorController} from './db-generator.controller';
import {DbGeneratorService} from './db-generator.service';

describe('DbHandleController', () => {
  let controller: DbGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbGeneratorController],
      providers: [DbGeneratorService],
    }).compile();

    controller = module.get<DbGeneratorController>(DbGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
