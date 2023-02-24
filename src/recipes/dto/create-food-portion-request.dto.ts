import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateFoodPortionRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  foodId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    required: true,
  })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  unitId: string;
}
