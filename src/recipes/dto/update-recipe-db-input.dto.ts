import {PartialType} from '@nestjs/swagger';
import {UpdateRecipeRequestDto} from './update-recipe-request.dto';

export class UpdateRecipeDbInputDto extends PartialType(
  UpdateRecipeRequestDto,
) {}
