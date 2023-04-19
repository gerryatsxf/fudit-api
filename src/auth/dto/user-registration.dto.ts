import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsDate, MaxDate} from 'class-validator';

export class UserRegistrationDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  //@MaxDate(require('moment')().subtract(13, 'y').toDate())
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;
}
