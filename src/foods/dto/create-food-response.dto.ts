import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {CreateFoodResultDto} from './create-food-result.dto';

export class CreateFoodResponseDto {
  @ApiProperty({
    type: getSchemaPath(CreateFoodResultDto),
  })
  data: CreateFoodResultDto;
}
