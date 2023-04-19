import {Controller, Get, UseGuards, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {GetProfileResponseDto} from './dto/get-profile-response.dto';
import {UsersService} from './users.service';
import {GetProfileResultDto} from './dto/get-profile-result.dto';
import {User} from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    const {id, email, firstName, lastName} = req.user.properties;

    const user = new User();
    user.id = id;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    const result = new GetProfileResultDto();
    result.user = user;
    const response = new GetProfileResponseDto();
    response.data = result;
    return response;
  }
}
