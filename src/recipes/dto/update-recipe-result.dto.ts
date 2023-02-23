import {ApiProperty} from '@nestjs/swagger';
import {Recipe} from '../entities/recipe.entity';

export class UpdateRecipeResultDto {
  @ApiProperty({
    type: Recipe,
  })
  recipe: Recipe;
}
