import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToInstance} from 'class-transformer';

@Injectable()
export class CreateFoodRequestPipe implements PipeTransform<any> {
  async transform(value: any, {metatype}: ArgumentMetadata) {
    if (
      !metatype
      // || !this.toValidate(metatype)
    ) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    const dietaryInfoIsValid = this.validateDietaryInfoInput(value);
    console.log('dietaryInfoIsValid', dietaryInfoIsValid);
    if (errors.length > 0 || !dietaryInfoIsValid) {
      throw new BadRequestException('Validation failed');
    }

    return object;
  }

  validateDietaryInfoInput(value: any): boolean {
    let infoPerKgIsValid = false;
    const {kcalPerKg, proteinsPerKg, carbohydratesPerKg, lipidsPerKg} = value;
    if (kcalPerKg !== null && kcalPerKg !== undefined) {
      if (proteinsPerKg !== null && proteinsPerKg !== undefined) {
        if (carbohydratesPerKg !== null && carbohydratesPerKg !== undefined) {
          if (lipidsPerKg !== null && lipidsPerKg !== undefined) {
            infoPerKgIsValid = true;
          }
        }
      }
    }
    let infoPerLtIsValid = false;

    const {kcalPerLt, proteinsPerLt, carbohydratesPerLt, lipidsPerLt} = value;
    if (kcalPerLt !== null && kcalPerLt !== undefined) {
      if (proteinsPerLt !== null && proteinsPerLt !== undefined) {
        if (carbohydratesPerLt !== null && carbohydratesPerLt !== undefined) {
          if (lipidsPerLt !== null && lipidsPerLt !== undefined) {
            infoPerLtIsValid = true;
          }
        }
      }
    }
    return infoPerKgIsValid || infoPerLtIsValid;
  }

  // private toValidate(metatype: Function): boolean {
  //   const types: Function[] = [String, Boolean, Number, Array, Object];
  //   return !types.includes(metatype);
  // }
}
