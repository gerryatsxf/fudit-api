import {ApiProperty} from '@nestjs/swagger';
import {UpdatePortionResultDto} from './update-portion-result.dto';

export class UpdatePortionResponseDto {
  @ApiProperty({
    type: UpdatePortionResultDto,
  })
  data: UpdatePortionResultDto;
}
