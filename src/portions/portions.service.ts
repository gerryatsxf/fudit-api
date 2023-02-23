import {Injectable} from '@nestjs/common';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {DeletePortionResultDto} from './dto/delete-portion-result.dto';
import {UpdatePortionRequestDto} from './dto/update-portion-request.dto';
import {UpdatePortionResultDto} from './dto/update-portion-result.dto';
import {Portion} from './entities/portion.entity';

@Injectable()
export class PortionsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async update(
    userId: string,
    portionId: string,
    updatePortionDto: UpdatePortionRequestDto,
  ): Promise<UpdatePortionResultDto> {
    const rStatement = `
      MATCH (u:User {id: $userId})-[:HAS_ACCESS_TO {canEdit:True}]->(r:Recipe)<-[:USED_IN]-(p:Portion {id: $portionId})
      MATCH (units:Unit)-[measured_in:MEASURED_IN]-(p)-[portion_of:PORTION_OF]-(f:Food)
      
      ${
        updatePortionDto.foodId
          ? `
        MATCH (newFood:Food {id: $foodId}) 
        DELETE portion_of
        MERGE (p)-[:PORTION_OF]->(newFood)
        SET p.description = "Portion of " + newFood.name
      `
          : ''
      }

      ${
        updatePortionDto.unitId
          ? `
        MATCH (newUnit:Unit {id: $unitId}) 
        DELETE measured_in
        MERGE (p)-[:MEASURED_IN]->(newUnit)
      `
          : ''
      }

      ${
        updatePortionDto.quantity
          ? `
        SET p.quantity = $quantity
      `
          : ''
      }

      WITH {
        id:p.id,
        food:properties(${updatePortionDto.foodId ? 'newFood' : 'f'}),
        quantity:p.quantity,
        description:p.description,
        totalKcal: p.quantity*0.001*${
          updatePortionDto.foodId ? 'newFood' : 'f'
        }.kcalPerKg,
        unit:properties(${updatePortionDto.unitId ? 'newUnit' : 'units'})
      } as portion

      RETURN portion
    `;

    const res = await this.neo4jService.write(rStatement, {
      userId,
      portionId,
      ...updatePortionDto,
    });
    const portion: Portion = res.records[0].get('portion');
    const result = new UpdatePortionResultDto();
    result.portion = portion;
    return result;
  }

  async remove(userId, portionId: string): Promise<DeletePortionResultDto> {
    const result = new DeletePortionResultDto();
    return result;
  }
}
