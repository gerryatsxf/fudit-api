import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class RegisterResponseDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  access_token: string;
}
