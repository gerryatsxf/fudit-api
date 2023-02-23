import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {UpdateFoodResultDto} from './update-food-result.dto';

export class UpdateFoodResponseDto {
  @ApiProperty({
    type: getSchemaPath(UpdateFoodResultDto),
  })
  data: UpdateFoodResultDto;
}
