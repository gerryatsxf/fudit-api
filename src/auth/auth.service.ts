import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {EncryptionService} from '../encryption/encryption.service';
import {User, UsersService} from '../users/users.service';
import {RegisterResponseDto} from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      this.encryptionService.compare(
        password,
        (user.properties as Record<string, any>).password,
      )
    ) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.userId};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createToken(user: User): Promise<RegisterResponseDto> {
    const {id, email, dateOfBirth, firstName, lastName} = <Record<string, any>>(
      user.properties
    );
    return {
      access_token: this.jwtService.sign({
        sub: id,
        email,
        dateOfBirth,
        firstName,
        lastName,
      }),
    };
  }
}
