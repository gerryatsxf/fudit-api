import {ApiProperty} from '@nestjs/swagger';

export class CreateFoodPortionRequestDto {
  @ApiProperty({
    type: 'string',
  })
  foodId: string;

  @ApiProperty({
    type: 'number',
  })
  quantity: number;

  @ApiProperty({
    type: 'string',
  })
  unitId: string;
}
