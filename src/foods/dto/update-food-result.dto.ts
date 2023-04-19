import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {Food} from '../entities/food.entity';

export class UpdateFoodResultDto {
  @ApiProperty({
    type: getSchemaPath(Food),
  })
  food: Food;
}
