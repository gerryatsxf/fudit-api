import {OmitType, PartialType} from '@nestjs/swagger';
import {CreateRecipeRequestDto} from './create-recipe-request.dto';

export class UpdateRecipeRequestDto extends PartialType(
  OmitType(CreateRecipeRequestDto, ['portions'] as const),
) {}
