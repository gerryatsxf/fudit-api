import {ApiProperty} from '@nestjs/swagger';
import {MacronutrientConfigDto} from '../dto/macronutrient-config.dto';

export class Food {
  @ApiProperty({
    type: 'boolean',
    required: false,
  })
  public?: boolean;

  @ApiProperty({
    type: 'boolean',
  })
  recipe: boolean;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  description: string;

  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: MacronutrientConfigDto,
  })
  macronutrients: MacronutrientConfigDto;

  @ApiProperty({
    type: 'number',
  })
  kcalPerKg: number;
}
