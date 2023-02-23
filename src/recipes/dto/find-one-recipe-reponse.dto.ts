import {ApiProperty} from '@nestjs/swagger';
import {FindOneRecipeResultDto} from './find-one-recipe-result.dto';

export class FindOneRecipeResponseDto {
  @ApiProperty({
    type: FindOneRecipeResultDto,
  })
  data: FindOneRecipeResultDto;
}
