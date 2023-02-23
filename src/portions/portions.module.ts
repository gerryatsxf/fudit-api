import {Module} from '@nestjs/common';
import {PortionsService} from './portions.service';
import {PortionsController} from './portions.controller';

@Module({
  controllers: [PortionsController],
  providers: [PortionsService],
})
export class PortionsModule {}
