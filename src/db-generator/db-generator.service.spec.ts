import {Test, TestingModule} from '@nestjs/testing';
import {DbGeneratorService} from './db-generator.service';

describe('DbHandleService', () => {
  let service: DbGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbGeneratorService],
    }).compile();

    service = module.get<DbGeneratorService>(DbGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
