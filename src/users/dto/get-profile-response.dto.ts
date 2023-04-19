import {ApiProperty} from '@nestjs/swagger';
import {GetProfileResultDto} from './get-profile-result.dto';

export class GetProfileResponseDto {
  @ApiProperty({
    type: GetProfileResultDto,
  })
  data: GetProfileResultDto;
}
