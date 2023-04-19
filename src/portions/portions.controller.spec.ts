import {Test, TestingModule} from '@nestjs/testing';
import {PortionsController} from './portions.controller';

describe('PortionsController', () => {
  let controller: PortionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortionsController],
    }).compile();

    controller = module.get<PortionsController>(PortionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
