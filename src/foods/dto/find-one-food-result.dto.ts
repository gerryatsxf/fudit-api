import {ApiProperty} from '@nestjs/swagger';
import {Food} from '../entities/food.entity';

export class FindOneFoodResultDto {
  @ApiProperty({
    type: Food,
  })
  food: Food;
}
