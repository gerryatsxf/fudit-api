import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {UnitsService} from './units.service';
import {CreateUnitDto} from './dto/create-unit.dto';
import {UpdateUnitDto} from './dto/update-unit.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth} from '@nestjs/swagger';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  // @Post()
  // create(@Body() createUnitDto: CreateUnitDto) {
  //   return this.unitsService.create(createUnitDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
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
