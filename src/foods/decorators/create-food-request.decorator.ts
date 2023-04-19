import {createParamDecorator, ExecutionContext, Request} from '@nestjs/common';
import {plainToClass, plainToInstance} from 'class-transformer';
import {CreateFoodRequestDto} from '../dto/create-food-request.dto';

export const CreateFoodRequestDecorator = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const createRequest: CreateFoodRequestDto = plainToInstance(
      CreateFoodRequestDto,
      request.body,
    );
    return createRequest;
  },
);
