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
import {DbHandleModule} from './db-handle/db-handle.module';
import {UnitsModule} from './units/units.module';

const NEO4J_SCHEME = 'neo4j+s';
const NEO4J_HOST = 'a62ce38e.databases.neo4j.io';
const NEO4J_PORT = 7687; // 7687, 7474, 443
const NEO4J_URI = 'neo4j+s://a62ce38e.databases.neo4j.io';
const NEO4J_USERNAME = 'neo4j';
const NEO4J_PASSWORD = 'D0wqxyKyyu8KRD68CwGn6D1F8PKJPsLbFNNM3K5fYpo';
const AURA_INSTANCENAME = 'Instance01';

const option: Neo4jConfig = {
  scheme: NEO4J_SCHEME,
  host: NEO4J_HOST,
  port: NEO4J_PORT,
  username: NEO4J_USERNAME,
  password: NEO4J_PASSWORD,
};

@Module({
  imports: [
    UsersModule,
    AuthModule,
    Neo4jModule.forRoot(option),
    EncryptionModule,
    ConfigModule.forRoot(),
    SubscriptionModule,
    FoodsModule,
    RecipesModule,
    PortionsModule,
    DbHandleModule,
    UnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
