import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {FindOneFoodResultDto} from './find-one-food-result.dto';

export class FindOneFoodResponseDto {
  @ApiProperty({
    type: getSchemaPath(FindOneFoodResultDto),
  })
  data: FindOneFoodResultDto;
}
