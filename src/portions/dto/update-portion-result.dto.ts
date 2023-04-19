import {ApiProperty} from '@nestjs/swagger';
import {Portion} from '../entities/portion.entity';

export class UpdatePortionResultDto {
  @ApiProperty({
    type: Portion,
  })
  portion: Portion;
}
