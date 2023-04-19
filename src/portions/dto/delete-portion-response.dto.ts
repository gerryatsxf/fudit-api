import {ApiProperty} from '@nestjs/swagger';
import {DeletePortionResultDto} from './delete-portion-result.dto';

export class DeletePortionResponseDto {
  @ApiProperty({
    type: DeletePortionResultDto,
  })
  data: DeletePortionResultDto;
}
