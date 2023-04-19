import {Test, TestingModule} from '@nestjs/testing';
import {PortionsService} from './portions.service';

describe('PortionsService', () => {
  let service: PortionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortionsService],
    }).compile();

    service = module.get<PortionsService>(PortionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
