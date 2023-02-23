import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from './strategies/local.strategy';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {EncryptionModule} from '../encryption/encryption.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {EncryptionService} from '../encryption/encryption.service';
import {JWT_EXPIRES_IN, JWT_SECRET} from './auth.constants';
import {SubscriptionModule} from 'src/subscription/subscription.module';
import {SubscriptionService} from 'src/subscription/subscription.service';

const jwtFactory = (configService: ConfigService) => ({
  secret: configService.get<string>(JWT_SECRET),
  signOptions: {
    expiresIn: configService.get<string>(JWT_EXPIRES_IN),
  },
});

const options = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: jwtFactory,
};

@Module({
  imports: [
    EncryptionModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(options),
    SubscriptionModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EncryptionService,
    ConfigService,
    SubscriptionService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
