import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {EncryptionModule} from './encryption/encryption.module';
import {ConfigModule} from '@nestjs/config';
import {Neo4jConfig} from './neo4j/interfaces/neo4j-config.interface';
import {Neo4jModule} from './neo4j/neo4j.module';
import {SubscriptionModule} from './subscription/subscription.module';
import {FoodsModule} from './foods/foods.module';
import {RecipesModule} from './recipes/recipes.module';
import {PortionsModule} from './portions/portions.module';
import {DbGeneratorModule} from './db-generator/db-generator.module';
import {UnitsModule} from './units/units.module';

import * as dotenv from 'dotenv';
dotenv.config();

const NEO4J_SCHEME = 'neo4j+s';

const option: Neo4jConfig = {
  scheme: NEO4J_SCHEME,
  host: process.env.NEO4J_HOST,
  port: process.env.NEO4J_PORT,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
};

@Module({
  imports: [
    UsersModule,
    AuthModule,
    Neo4jModule.forRoot(option),
    EncryptionModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SubscriptionModule,
    FoodsModule,
    RecipesModule,
    PortionsModule,
    DbGeneratorModule,
    UnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
