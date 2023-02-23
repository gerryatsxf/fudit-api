import {ApiProperty} from '@nestjs/swagger';

export class CreateFoodRequestDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  description: string;

  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 kg of food',
    required: false,
  })
  kcalPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 kg of food',
    required: false,
  })
  proteinsPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 kg of food',
    required: false,
  })
  carbohydratesPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 kg of food',
    required: false,
  })
  lipidsPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 liter of food',
    required: false,
  })
  kcalPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 litter of food',
    required: false,
  })
  proteinsPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 liter of food',
    required: false,
  })
  carbohydratesPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 liter of food',
    required: false,
  })
  lipidsPerLt: number;
}
