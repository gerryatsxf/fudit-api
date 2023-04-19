import {ApiProperty} from '@nestjs/swagger';
import {Portion} from 'src/portions/entities/portion.entity';
import {RecipeMacronutrients} from '../dto/recipe-macronutrients.dto';

export class Recipe {
  @ApiProperty({
    type: 'boolean',
  })
  public: boolean;

  @ApiProperty({
    type: 'boolean',
  })
  recipe: boolean;

  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  description: string;

  @ApiProperty({
    type: RecipeMacronutrients,
  })
  macronutrients: RecipeMacronutrients;

  @ApiProperty({
    type: 'number',
  })
  kcalPerKg: number;

  @ApiProperty({
    type: 'number',
  })
  accumulatedWeightInKg: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  realWeightInKg?: number;

  @ApiProperty({
    type: Portion,
  })
  portions: Portion;
}
