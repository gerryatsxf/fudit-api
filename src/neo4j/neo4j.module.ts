import {Module, DynamicModule, Provider} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {Neo4jService} from './neo4j.service';
import {Neo4jConfig} from './interfaces/neo4j-config.interface';
import {NEO4J_OPTIONS, NEO4J_DRIVER} from './neo4j.constants';
import {createDriver} from './neo4j.utils';

@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    const optionsProvider = {
      provide: NEO4J_OPTIONS,
      useValue: config,
    };

    const driverProvider = {
      provide: NEO4J_DRIVER,
      inject: [NEO4J_OPTIONS],
      useFactory: async (config: Neo4jConfig) => createDriver(config),
    };

    return {
      module: Neo4jModule,
      global: true,
      providers: [optionsProvider, driverProvider, Neo4jService, ConfigService],
      exports: [Neo4jService],
    };
  }

  static forRootAsync(configProvider: any): DynamicModule {
    const optionsProvider = {
      provide: NEO4J_OPTIONS,
      ...configProvider,
    } as Provider<any>;

    const driverProvider = {
      provide: NEO4J_DRIVER,
      inject: [NEO4J_OPTIONS],
      useFactory: async (config: Neo4jConfig) => createDriver(config),
    };

    return {
      module: Neo4jModule,
      global: true,
      imports: [ConfigModule],
      providers: [optionsProvider, driverProvider, Neo4jService],
      exports: [Neo4jService],
    };
  }

  static fromEnv(): DynamicModule {
    const neo4jFactory = (configService: ConfigService): Neo4jConfig => ({
      scheme: configService.get('NEO4J_SCHEME'),
      host: configService.get('NEO4J_HOST'),
      port: configService.get('NEO4J_PORT'),
      username: configService.get('NEO4J_USERNAME'),
      password: configService.get('NEO4J_PASSWORD'),
      database: configService.get('NEO4J_DATABASE'),
    });

    const neo4jDBProvider = {
      provide: NEO4J_OPTIONS,
      inject: [ConfigService],
      useFactory: neo4jFactory,
    } as Provider<any>;

    const neo4jDriverProvider = {
      provide: NEO4J_DRIVER,
      inject: [NEO4J_OPTIONS],
      useFactory: async (config: Neo4jConfig) => createDriver(config),
    };

    return {
      module: Neo4jModule,
      global: true,
      imports: [ConfigModule],
      providers: [neo4jDBProvider, neo4jDriverProvider, Neo4jService],
      exports: [Neo4jService],
    };
  }
}
