import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {RecipesService} from './recipes.service';
import {CreateRecipeRequestDto} from './dto/create-recipe-request.dto';
import {UpdateRecipeRequestDto} from './dto/update-recipe-request.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {CreateRecipeResponseDto} from './dto/create-recipe-response.dto';
import {CreateRecipeResultDto} from './dto/create-recipe-result.dto';
import {FindAllRecipeResponseDto} from './dto/find-all-recipe-response.dto';
import {FindAllRecipeResultDto} from './dto/find-all-recipe-result.dto';
import {FindOneRecipeResultDto} from './dto/find-one-recipe-result.dto';
import {FindOneRecipeResponseDto} from './dto/find-one-recipe-reponse.dto';
import {UpdateRecipeResultDto} from './dto/update-recipe-result.dto';
import {UpdateRecipeResponseDto} from './dto/update-recipe-response.dto';
@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createRecipeDto: CreateRecipeRequestDto,
    @Request() req,
  ): Promise<CreateRecipeResponseDto> {
    const userId = req.user.properties.id;

    return this.recipesService
      .create(userId, createRecipeDto)
      .then((result: CreateRecipeResultDto) => {
        const response = new CreateRecipeResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req): Promise<FindAllRecipeResponseDto> {
    const userId = req.user.properties.id;
    return this.recipesService
      .findAll(userId)
      .then((result: FindAllRecipeResultDto) => {
        const response = new FindAllRecipeResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') recipeId: string, @Request() req) {
    const userId = req.user.properties.id;
    return this.recipesService
      .findOne(userId, recipeId)
      .then((result: FindOneRecipeResultDto) => {
        const response = new FindOneRecipeResponseDto();
        response.data = result;
        return response;
      });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
    @Request() req,
  ) {
    const userId = req.user.properties.id;
    return this.recipesService
      .update(userId, id, updateRecipeDto)
      .then((result: UpdateRecipeResultDto) => {
        const response = new UpdateRecipeResponseDto();
        response.data = result;
        return response;
      });
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recipesService.remove(+id);
  // }
}
