import {ApiProperty} from '@nestjs/swagger';

// NOTE: Measured in grams
// NOTE: Not inserting macronutrients in Food nodes because Recipes won't have macronutrients associated, they'll be calculated at runtime
export class MacronutrientConfigDto {
  @ApiProperty({
    type: 'number',
  })
  proteinsPerKg: number;

  @ApiProperty({
    type: 'number',
  })
  carbohydratesPerKg: number;

  @ApiProperty({
    type: 'number',
  })
  lipidsPerKg: number;

  // TODO: to implement later
  @ApiProperty({
    type: 'number',
  })
  proteinsPerLt: number;

  @ApiProperty({
    type: 'number',
  })
  carbohydratesPerLt: number;

  @ApiProperty({
    type: 'number',
  })
  lipidsPerLt: number;
}
