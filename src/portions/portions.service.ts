import {Injectable} from '@nestjs/common';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {DeletePortionResultDto} from './dto/delete-portion-result.dto';
import {UpdatePortionRequestDto} from './dto/update-portion-request.dto';
import {UpdatePortionResultDto} from './dto/update-portion-result.dto';
import {Portion} from './entities/portion.entity';

const USER = 'User';
const U = 'u';

const RECIPE = 'Recipe';
const R = 'r';

const PORTION = 'Portion';
const P = 'p';

const FOOD = 'Food';
const F = 'f';

const UNIT = 'Unit';
const UN = 'un';

const PORTION_OF = '${PORTION_OF}';
const USED_IN = 'USED_IN';
const HAS_ACCESS_TO = 'HAS_ACCESS_TO';
const MEASURED_IN = 'MEASURED_IN';

@Injectable()
export class PortionsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async update(
    userId: string,
    portionId: string,
    updatePortionDto: UpdatePortionRequestDto,
  ): Promise<UpdatePortionResultDto> {
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO} {canEdit:True}]->(${R}:${RECIPE})<-[:${USED_IN}]-(${P}:${PORTION} {id: $portionId})
      MATCH (${UN}:${UNIT})-[measured_in:${MEASURED_IN}]-(${P})-[portion_of:${PORTION_OF}]-(${F}:${FOOD})
      
      ${
        updatePortionDto.foodId
          ? `
        MATCH (newFood:${FOOD} {id: $foodId}) 
        DELETE portion_of
        MERGE (${P})-[:${PORTION_OF}]->(newFood)
        SET ${P}.description = "Portion of " + newFood.name
      `
          : ''
      }

      ${
        updatePortionDto.unitId
          ? `
        MATCH (newUnit:${UNIT} {id: $unitId}) 
        DELETE measured_in
        MERGE (${P})-[:${MEASURED_IN}]->(newUnit)
      `
          : ''
      }

      ${
        updatePortionDto.quantity
          ? `
        SET ${P}.quantity = $quantity
      `
          : ''
      }

      WITH {
        id:${P}.id,
        food:properties(${updatePortionDto.foodId ? 'newFood' : F}),
        quantity:${P}.quantity,
        description:${P}.description,
        totalKcal: ${P}.quantity*0.001*${
      updatePortionDto.foodId ? 'newFood' : F
    }.kcalPerKg,
        unit:properties(${updatePortionDto.unitId ? 'newUnit' : UN})
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
