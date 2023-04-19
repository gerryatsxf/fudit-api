import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {Food} from '../entities/food.entity';

export class FindAllFoodResult {
  @ApiProperty({
    type: 'array',
    items: {
      type: getSchemaPath(Food),
    },
  })
  foods: Food[];
}
