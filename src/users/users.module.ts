import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {EncryptionModule} from '../encryption/encryption.module';
import {UsersController} from './users.controller';

@Module({
  imports: [EncryptionModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
