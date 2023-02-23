import {Module} from '@nestjs/common';
import {FoodsService} from './foods.service';
import {FoodsController} from './foods.controller';
import {Neo4jModule} from 'src/neo4j/neo4j.module';
import {Neo4jService} from 'src/neo4j/neo4j.service';

@Module({
  imports: [],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
