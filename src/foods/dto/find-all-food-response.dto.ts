import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {FindAllFoodResult} from './find-all-food-result.dto';

export class FindAllFoodResponse {
  @ApiProperty({
    type: getSchemaPath(FindAllFoodResult),
  })
  data: FindAllFoodResult;
}
