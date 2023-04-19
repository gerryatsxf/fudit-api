import {ApiProperty} from '@nestjs/swagger';
import {Food} from 'src/foods/entities/food.entity';
import {Unit} from 'src/recipes/entities/unit.entity';

export class Portion {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: Food,
  })
  food: Food;

  @ApiProperty({
    type: Unit,
  })
  unit: Unit;

  @ApiProperty({
    type: 'string',
  })
  description: string;

  @ApiProperty({
    type: 'number',
  })
  quantity: number;
}
