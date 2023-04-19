import {ApiProperty} from '@nestjs/swagger';
import {Recipe} from '../entities/recipe.entity';

export class CreateRecipeResultDto {
  @ApiProperty({
    type: Recipe,
  })
  recipe: Recipe;
}
