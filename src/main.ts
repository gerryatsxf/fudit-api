import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {Neo4jErrorFilter} from './neo4j/filters/neo4j-error.filter';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new Neo4jErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('Identity API')
    .setDescription(
      'This is the Identity API. Please use this in order to register, authenticate and get information of users.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('/', app, document);

  await app.listen(3002);
}

bootstrap();
