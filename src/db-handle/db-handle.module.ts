import { Module } from '@nestjs/common';
import { DbHandleService } from './db-handle.service';
import { DbHandleController } from './db-handle.controller';

@Module({
  controllers: [DbHandleController],
  providers: [DbHandleService]
})
export class DbHandleModule {}
