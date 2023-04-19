import {ApiProperty} from '@nestjs/swagger';

export class Unit {
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  abbreviation: string;
}
