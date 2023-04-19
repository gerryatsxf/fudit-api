import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsPositive, IsString, Min, ValidateIf} from 'class-validator';

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

  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 kg of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  kcalPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 kg of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  proteinsPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 kg of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null) // TODO: find a way to add error msg to this validation
  carbohydratesPerKg: number;
  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 kg of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  lipidsPerKg: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (energy in kcal) of calories per 1 liter of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  kcalPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of proteins per 1 litter of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  proteinsPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of carbohydrates per 1 liter of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  carbohydratesPerLt: number;

  @ApiProperty({
    type: 'number',
    description: 'Amount (weight in gr) of lipids per 1 liter of food',
    required: false,
  })
  @IsPositive()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  lipidsPerLt: number;
}
