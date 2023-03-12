import {Unit} from '../entities/unit.entity';
import {ApiProperty, getSchemaPath} from '@nestjs/swagger';

export class FindAllUnitResultDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: getSchemaPath(Unit),
    },
  })
  units: Unit[];
}
