import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UnitsService} from './units.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  // @Post()
  // create(@Body() createUnitDto: CreateUnitRequestDto) {
  //   return this.unitsService.create(createUnitDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.unitsService.findOne(id).then(result => {
      return result;
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
  //   return this.unitsService.update(+id, updateUnitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.unitsService.remove(+id);
  // }
}
