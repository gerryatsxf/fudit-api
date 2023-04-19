import {ApiProperty} from '@nestjs/swagger';
import {CreateRecipeResultDto} from './create-recipe-result.dto';

export class CreateRecipeResponseDto {
  @ApiProperty({
    type: CreateRecipeResultDto,
  })
  data: CreateRecipeResultDto;
}
