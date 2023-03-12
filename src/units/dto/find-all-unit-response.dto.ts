import {FindAllUnitResultDto} from './find-all-unit-result.dto';
import {ApiProperty} from '@nestjs/swagger';

export class FindAllUnitResponseDto {
  @ApiProperty({
    type: FindAllUnitResultDto,
  })
  data: FindAllUnitResultDto;
}
