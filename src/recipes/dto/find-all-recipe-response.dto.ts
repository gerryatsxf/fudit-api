import {ApiProperty} from '@nestjs/swagger';
import {FindAllRecipeResultDto} from './find-all-recipe-result.dto';

export class FindAllRecipeResponseDto {
  @ApiProperty({
    type: FindAllRecipeResultDto,
  })
  data: FindAllRecipeResultDto;
}
