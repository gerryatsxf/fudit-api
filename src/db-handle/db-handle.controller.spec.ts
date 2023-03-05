import {Test, TestingModule} from '@nestjs/testing';
import {DbHandleController} from './db-handle.controller';
import {DbHandleService} from './db-handle.service';

describe('DbHandleController', () => {
  let controller: DbHandleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbHandleController],
      providers: [DbHandleService],
    }).compile();

    controller = module.get<DbHandleController>(DbHandleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
