import {ApiProperty} from '@nestjs/swagger';
import {DietaryInfoDto} from '../dto/dietary-info.dto';

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
    type: DietaryInfoDto,
  })
  macronutrients: DietaryInfoDto;

  @ApiProperty({
    type: 'number',
  })
  kcalPerKg: number;
}
