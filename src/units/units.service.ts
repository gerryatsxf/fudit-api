import {Injectable} from '@nestjs/common';
import {FindAllUnitResultDto} from './dto/find-all-unit-result.dto';
import {Neo4jService} from '../neo4j/neo4j.service';
import {FindOneUnitResultDto} from './dto/find-one-unit-result.dto';

@Injectable()
export class UnitsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll(): Promise<FindAllUnitResultDto> {
    const cStatements = `
      MATCH (u:Unit)
      RETURN u
    `;
    const res = await this.neo4jService.read(cStatements);
    const units = res.records.map(record => record.get('u').properties);
    const result = new FindAllUnitResultDto();
    result.units = units;
    return result;
  }

  async findOne(id: string): Promise<FindOneUnitResultDto> {
    const cStatements = `
      MATCH (u:Unit {id: $id})
      RETURN u
    `;
    const res = await this.neo4jService.read(cStatements, {id});
    const unit = res.records[0].get('u').properties;
    const result = new FindOneUnitResultDto();
    result.unit = unit;
    return result;
  }
}
