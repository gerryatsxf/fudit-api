import {Module} from '@nestjs/common';
import {DbGeneratorService} from './db-generator.service';
import {DbGeneratorController} from './db-generator.controller';

@Module({
  controllers: [DbGeneratorController],
  providers: [DbGeneratorService],
})
export class DbGeneratorModule {}
