import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {Food} from '../entities/food.entity';

export class CreateFoodResultDto {
  @ApiProperty({
    type: getSchemaPath(Food),
  })
  food: Food;
}
