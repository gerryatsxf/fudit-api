import {ApiProperty} from '@nestjs/swagger';
import {Recipe} from '../entities/recipe.entity';

export class FindOneRecipeResultDto {
  @ApiProperty({
    type: Recipe,
  })
  recipe: Recipe;
}
