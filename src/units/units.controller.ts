import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UnitsService} from './units.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {FindOneUnitResponseDto} from './dto/find-one-unit-response.dto';
import {FindAllUnitResponseDto} from './dto/find-all-unit-response.dto';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.unitsService.findAll().then(result => {
      const response = new FindAllUnitResponseDto();
      response.data = result;
      return response;
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<FindOneUnitResponseDto> {
    return this.unitsService.findOne(id).then(result => {
      const response = new FindOneUnitResponseDto();
      response.data = result;
      return response;
    });
  }
}
