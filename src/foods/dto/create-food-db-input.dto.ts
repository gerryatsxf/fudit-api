import {PartialType} from '@nestjs/swagger';
import {CreateFoodRequestDto} from './create-food-request.dto';

export class CreateFoodDbInputDto extends PartialType(CreateFoodRequestDto) {}
