import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import {PortionsService} from './portions.service';
import {UpdatePortionRequestDto} from './dto/update-portion-request.dto';
import {UpdatePortionResultDto} from './dto/update-portion-result.dto';
import {UpdatePortionResponseDto} from './dto/update-portion-response.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Food portions')
@Controller('portions')
export class PortionsController {
  constructor(private readonly portionsService: PortionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePortionDto: UpdatePortionRequestDto,
  ) {
    const userId = req.user.properties.id;
    return this.portionsService
      .update(userId, id, updatePortionDto)
      .then((result: UpdatePortionResultDto) => {
        const response = new UpdatePortionResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.properties.id;
    return this.portionsService.remove(userId, id);
  }
}
