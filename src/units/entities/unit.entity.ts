import {ApiProperty} from '@nestjs/swagger';

export class Unit {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  key: string;

  @ApiProperty({
    type: String,
  })
  name: string;
}
