import {ApiProperty} from '@nestjs/swagger';
import {CreateFoodPortionRequestDto} from './create-food-portion-request.dto';
import {ArrayNotEmpty, IsArray, IsString} from 'class-validator';

export class CreateRecipeRequestDto {
  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({type: [CreateFoodPortionRequestDto]})
  portions: CreateFoodPortionRequestDto[];

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
  realKcalPerKg?: number | undefined;

  @ApiProperty({
    type: 'number',
    description: 'Measured weight (in kg) after cooking all portions of recipe',
    required: false,
  })
  realWeightInKg?: number | undefined;
}
