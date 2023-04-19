import {ApiProperty} from '@nestjs/swagger';
import {UpdateRecipeResultDto} from './update-recipe-result.dto';

export class UpdateRecipeResponseDto {
  @ApiProperty({
    type: UpdateRecipeResultDto,
  })
  data: UpdateRecipeResultDto;
}
