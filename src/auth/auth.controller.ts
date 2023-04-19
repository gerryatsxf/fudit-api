import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {UserCredentialsDto} from './dto/user-credential.dto';
import {UserRegistrationDto} from './dto/user-registration.dto';
import {UsersService} from '../users/users.service';
import {RegisterResponseDto} from './dto/register-response.dto';
import {SubscriptionService} from '../subscription/subscription.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post('register')
  async register(
    @Body() userRegistrationDto: UserRegistrationDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(
      userRegistrationDto.email,
      userRegistrationDto.password,
      new Date(userRegistrationDto.dateOfBirth),
      userRegistrationDto.firstName,
      userRegistrationDto.lastName,
    );
    //await this.subscriptionService.createSubscription(user, 3);
    return this.authService.createToken(user);
  }

  // TODO: find an alternate way of returning this response by using Guards
  // @All('register')
  // async notAllowedRegister(@Request() request, @Res() response): Promise<any> {
  //   // Return a 405 Method Not Allowed error for any HTTP method that is not POST
  //   if (request.method !== 'P  OST') {
  //     response.setHeader('Allow', 'POST');
  //     response.status(405).send({statusCode: 405, error: METHOD_NOT_ALLOWED});
  //   }
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({type: UserCredentialsDto})
  async login(@Request() req): Promise<RegisterResponseDto> {
    return this.authService.createToken(req.user);
  }

  // @All('login')
  // async notAllowedLogin(@Request() request, @Res() response): Promise<any> {
  //   // Return a 405 Method Not Allowed error for any HTTP method that is not POST
  //   if (request.method !== 'POST') {
  //     response.setHeader('Allow', 'POST');
  //     response.status(405).send({statusCode: 405, error: METHOD_NOT_ALLOWED});
  //   }
  // }
}
