import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class CreateFoodRequestDto {
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 kg of food',
    required: false,
  })
  kcalPerKg: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 kg of food',
    required: false,
  })
  proteinsPerKg: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 kg of food',
    required: false,
  })
  carbohydratesPerKg: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 kg of food',
    required: false,
  })
  lipidsPerKg: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 liter of food',
    required: false,
  })
  kcalPerLt: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 litter of food',
    required: false,
  })
  proteinsPerLt: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 liter of food',
    required: false,
  })
  carbohydratesPerLt: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 liter of food',
    required: false,
  })
  lipidsPerLt: number;
}
