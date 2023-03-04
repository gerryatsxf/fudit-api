import { Test, TestingModule } from '@nestjs/testing';
import { DbHandleService } from './db-handle.service';

describe('DbHandleService', () => {
  let service: DbHandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbHandleService],
    }).compile();

    service = module.get<DbHandleService>(DbHandleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
