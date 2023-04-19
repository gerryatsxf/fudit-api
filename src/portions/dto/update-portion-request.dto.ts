import {PartialType} from '@nestjs/swagger';
import {CreateFoodPortionRequestDto} from 'src/recipes/dto/create-food-portion-request.dto';

export class UpdatePortionRequestDto extends PartialType(
  CreateFoodPortionRequestDto,
) {}
