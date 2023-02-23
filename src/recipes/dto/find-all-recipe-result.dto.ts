import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {Recipe} from '../entities/recipe.entity';

export class FindAllRecipeResultDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: getSchemaPath(Recipe),
    },
  })
  recipes: Recipe[];
}
