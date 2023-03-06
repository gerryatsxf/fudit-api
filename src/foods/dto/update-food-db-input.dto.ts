import {PartialType} from '@nestjs/swagger';
import {UpdateFoodRequestDto} from './update-food-request.dto';

export class UpdateFoodDbInputDto extends PartialType(UpdateFoodRequestDto) {}
