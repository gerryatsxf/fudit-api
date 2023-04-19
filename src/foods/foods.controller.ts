import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import {FoodsService} from './foods.service';
import {CreateFoodRequestDto} from './dto/create-food-request.dto';
import {UpdateFoodRequestDto} from './dto/update-food-request.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {CreateFoodResponseDto} from './dto/create-food-response.dto';
import {FindOneFoodResultDto} from './dto/find-one-food-result.dto';
import {FindOneFoodResponseDto} from './dto/find-one-food-response.dto';
import {CreateFoodResultDto} from './dto/create-food-result.dto';
import {FindAllFoodResult} from './dto/find-all-food-result.dto';
import {FindAllFoodResponse} from './dto/find-all-food-response.dto';
import {CreateFoodRequestPipe} from './pipes/create-food-request.pipe';
import {UpdateFoodResponseDto} from './dto/udpate-food-response.dto';
import {UpdateFoodResultDto} from './dto/update-food-result.dto';
import {UpdateFoodRequestPipe} from './pipes/update-food-request.pipe';

@ApiTags('Foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body(new CreateFoodRequestPipe()) createFoodDto: CreateFoodRequestDto,
    @Request() req,
  ): Promise<CreateFoodResponseDto> {
    const userId = req.user.properties.id;
    return this.foodsService
      .create(userId, createFoodDto)
      .then((result: CreateFoodResultDto) => {
        const response = new CreateFoodResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req): Promise<FindAllFoodResponse> {
    const userId = req.user.properties.id;
    return this.foodsService
      .findAll(userId)
      .then((result: FindAllFoodResult) => {
        const response = new FindAllFoodResponse();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<FindOneFoodResponseDto> {
    const userId = req.user.properties.id;
    return this.foodsService
      .findOne(userId, id)
      .then((result: FindOneFoodResultDto) => {
        const response = new FindOneFoodResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    //TODO: find a way of making dietary info be complete for either Lt Kg or both
    @Body(new UpdateFoodRequestPipe()) updateFoodDto: UpdateFoodRequestDto,
    @Request() req,
  ): Promise<UpdateFoodResponseDto> {
    const userId = req.user.properties.id;
    return this.foodsService
      .update(userId, id, updateFoodDto)
      .then((result: UpdateFoodResultDto) => {
        const response = new UpdateFoodResponseDto();
        response.data = result;
        return response;
      });
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Delete(':id')
  // remove(@Param('id') id: string, @Request() req) {
  //   const userId = req.user.properties.id;
  //   return this.foodsService.remove(userId, id);
  // }
}
