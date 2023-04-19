import {PartialType} from '@nestjs/swagger';
import {CreateRecipeRequestDto} from './create-recipe-request.dto';

export class CreateRecipeDbInputDto extends PartialType(
  CreateRecipeRequestDto,
) {}
