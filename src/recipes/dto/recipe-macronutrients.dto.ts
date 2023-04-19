import {ApiProperty} from '@nestjs/swagger';

export class RecipeMacronutrients {
  @ApiProperty({
    type: 'number',
  })
  accumulatedProteins: number;

  @ApiProperty({
    type: 'number',
  })
  accumulatedCarbohydrates: number;

  @ApiProperty({
    type: 'number',
  })
  accumulatedLipids: number;
}
