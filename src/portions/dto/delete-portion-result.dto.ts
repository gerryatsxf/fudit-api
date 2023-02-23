import {ApiProperty} from '@nestjs/swagger';

export class DeletePortionResultDto {
  @ApiProperty({
    type: 'string',
  })
  portion: string;

  @ApiProperty({
    type: 'boolean',
  })
  deleted: boolean;
}
