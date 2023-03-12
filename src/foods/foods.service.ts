import {Injectable} from '@nestjs/common';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {CreateFoodRequestDto} from './dto/create-food-request.dto';
import {UpdateFoodRequestDto} from './dto/update-food-request.dto';
import {CreateFoodResultDto} from './dto/create-food-result.dto';
import {UpdateFoodResultDto} from './dto/update-food-result.dto';
import {FindOneFoodResultDto} from './dto/find-one-food-result.dto';
import {Food} from './entities/food.entity';
import {FindAllFoodResult} from './dto/find-all-food-result.dto';
import {CreateFoodDbInputDto} from './dto/create-food-db-input.dto';
import {UpdateFoodDbInputDto} from './dto/update-food-db-input.dto';

const USER = 'User';
const U = 'u';

const HAS_ACCESS_TO = 'HAS_ACCESS_TO';

const FOOD = 'Food';
const F = 'f';

const CONTAINS = 'CONTAINS';
const PORTION_OF = 'PORTION_OF';

const DIETARY_INFO = 'DietaryInfo';
const DI = 'di';

const PORTION = 'Portion';
const P = 'p';

@Injectable()
export class FoodsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private createRequestToDbInput(
    createFoodDto: CreateFoodRequestDto,
  ): CreateFoodDbInputDto {
    // TODO: find a way to insert this logic in the CreateFoodRequestDto class
    const createFoodDbInput = new CreateFoodDbInputDto();
    createFoodDbInput.name = createFoodDto.name;
    createFoodDbInput.description = createFoodDto.description;
    createFoodDbInput.kcalPerKg = createFoodDto.kcalPerKg;
    createFoodDbInput.carbohydratesPerKg = createFoodDto.carbohydratesPerKg;
    createFoodDbInput.proteinsPerKg = createFoodDto.proteinsPerKg;
    createFoodDbInput.lipidsPerKg = createFoodDto.lipidsPerKg;
    createFoodDbInput.kcalPerLt = createFoodDto.kcalPerLt;
    createFoodDbInput.carbohydratesPerLt = createFoodDto.carbohydratesPerLt;
    createFoodDbInput.proteinsPerLt = createFoodDto.proteinsPerLt;
    createFoodDbInput.lipidsPerLt = createFoodDto.lipidsPerLt;
    return createFoodDbInput;
  }

  private createFoodPropertiesStatements(): string {
    return `
      SET ${F}.public = False
      SET ${F}.name = $name
      SET ${F}.description = $description
      
      SET ${DI}.description = ${F}.name + ' macronutrients'
      SET ${DI}.kcalPerKg = $kcalPerKg
      SET ${DI}.carbohydratesPerKg = $carbohydratesPerKg
      SET ${DI}.proteinsPerKg = $proteinsPerKg
      SET ${DI}.lipidsPerKg = $lipidsPerKg
      SET ${DI}.kcalPerLt = $kcalPerLt
      SET ${DI}.carbohydratesPerLt = $carbohydratesPerLt
      SET ${DI}.proteinsPerLt = $proteinsPerLt
      SET ${DI}.lipidsPerLt = $lipidsPerLt
    `;
  }
  async create(
    userId: string,
    createFoodDto: CreateFoodRequestDto,
  ): Promise<CreateFoodResultDto> {
    const createFoodDbInput = this.createRequestToDbInput(createFoodDto);

    const res = await this.neo4jService.write(
      `
        MATCH (${U}:${USER} {id: $userId})
        MERGE (${U})-[:${HAS_ACCESS_TO} {canEdit:True, canDelete:True, createdByUser: True}]->(${F}:${FOOD} {id: randomUUID()})
        MERGE (${F})-[:${CONTAINS}]->(${DI}:${DIETARY_INFO} {id:randomUUID()})
        ${this.createFoodPropertiesStatements()}
        ${this.forgeFoodsStatements()}
      `,
      {
        userId,
        ...createFoodDbInput,
      },
    );

    const food: Food = res.records[0].get('food');
    const result = new CreateFoodResultDto();
    result.food = food;
    return result;
  }

  private forgeFoodsStatements(): string {
    return `
      WITH { 
        id: ${F}.id,
        name: ${F}.name,
        description: ${F}.description,
        public: ${F}.public, 
        dietaryInfo: {
                proteinsPerKg: ${DI}.proteinsPerKg,
                carbohydratesPerKg: ${DI}.carbohydratesPerKg,
                lipidsPerKg: ${DI}.lipidsPerKg,
                kcalPerKg: ${DI}.kcalPerKg,
                proteinsPerLt: ${DI}.proteinsPerLt,
                carbohydratesPerLt: ${DI}.carbohydratesPerLt,
                lipidsPerLt: ${DI}.lipidsPerLt,
                kcalPerLt: ${DI}.kcalPerLt
        }
      } AS food
      RETURN food
    `;
  }
  async findAll(userId: string): Promise<FindAllFoodResult> {
    const res = await this.neo4jService.read(
      `
        MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F}:${FOOD})<-[:${HAS_ACCESS_TO}]-(${U}:${USER} {id: $userId})
        ${this.forgeFoodsStatements()}
      `,
      {userId},
    );

    const foods = res.records.map(el => {
      return el.get('food');
    });
    const result = new FindAllFoodResult();
    result.foods = foods;
    return result;
  }

  async findOne(userId: string, foodId: string): Promise<FindOneFoodResultDto> {
    const res = await this.neo4jService.read(
      `
        MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F}:${FOOD} {id: $foodId})<-[:${HAS_ACCESS_TO}]-(${U}:${USER} {id: $userId})
        ${this.forgeFoodsStatements()}
      `,
      {foodId, userId},
    );

    const food: Food = res.records[0].get('food');
    const result = new FindOneFoodResultDto();
    result.food = food;
    return result;
  }

  private updateRequestToDbInput(
    updateFoodDto: UpdateFoodRequestDto,
  ): UpdateFoodDbInputDto {
    const updateFoodDbInput = new UpdateFoodDbInputDto();
    updateFoodDbInput.name = updateFoodDto.name;
    updateFoodDbInput.description = updateFoodDto.description;
    updateFoodDbInput.kcalPerKg = updateFoodDto.kcalPerKg;
    updateFoodDbInput.carbohydratesPerKg = updateFoodDto.carbohydratesPerKg;
    updateFoodDbInput.proteinsPerKg = updateFoodDto.proteinsPerKg;
    updateFoodDbInput.lipidsPerKg = updateFoodDto.lipidsPerKg;
    updateFoodDbInput.kcalPerLt = updateFoodDto.kcalPerLt;
    updateFoodDbInput.carbohydratesPerLt = updateFoodDto.carbohydratesPerLt;
    updateFoodDbInput.proteinsPerLt = updateFoodDto.proteinsPerLt;
    updateFoodDbInput.lipidsPerLt = updateFoodDto.lipidsPerLt;
    return updateFoodDbInput;
  }
  private forgeUpdateFoodsStatements(
    updateFoodDto: UpdateFoodRequestDto,
  ): string {
    return `
      ${updateFoodDto.name ? `SET ${F}.name = $name ` : ''}
      ${updateFoodDto.description ? `SET ${F}.description = $description ` : ''}

      ${
        updateFoodDto.name
          ? `
          SET ${DI}.description = ${F}.name + " macronutrients" 
          //SET ${P}.description = 'Portion of ' + ${F}.name
          `
          : ''
      }
      ${
        updateFoodDto.carbohydratesPerKg !== undefined
          ? `SET ${DI}.carbohydratesPerKg = $carbohydratesPerKg `
          : ''
      }
      ${
        updateFoodDto.proteinsPerKg !== undefined
          ? `SET ${DI}.proteinsPerKg = $proteinsPerKg `
          : ''
      }
      ${
        updateFoodDto.lipidsPerKg !== undefined
          ? `SET ${DI}.lipidsPerKg = $lipidsPerKg `
          : ''
      }
      ${
        updateFoodDto.kcalPerKg !== undefined
          ? `SET ${DI}.kcalPerKg = $kcalPerKg `
          : ''
      }
      ${
        updateFoodDto.carbohydratesPerLt !== undefined
          ? `SET ${DI}.carbohydratesPerLt = $carbohydratesPerLt `
          : ''
      }
      ${
        updateFoodDto.proteinsPerLt !== undefined
          ? `SET ${DI}.proteinsPerLt = $proteinsPerLt `
          : ''
      }
      ${
        updateFoodDto.lipidsPerLt !== undefined
          ? `SET ${DI}.lipidsPerLt = $lipidsPerLt `
          : ''
      }
      ${
        updateFoodDto.kcalPerLt !== undefined
          ? `SET ${DI}.kcalPerLt = $kcalPerLt `
          : ''
      }
      
    `;
  }

  async update(
    userId: string,
    foodId: string,
    updateFoodDto: UpdateFoodRequestDto,
  ): Promise<UpdateFoodResultDto> {
    const updateFoodDbInput = this.updateRequestToDbInput(updateFoodDto);
    const res = await this.neo4jService.write(
      `
        MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F}:${FOOD} {id: $foodId})<-[:${HAS_ACCESS_TO}]-(${U}:${USER} {id: $userId})
        // TODO: find a way of integrating inexisting portions
        // TODO: uncomment portions MATCH statement when portions are integrated
        //MATCH (${P}:${PORTION})-[:${PORTION_OF}]->(${F})
        ${this.forgeUpdateFoodsStatements(updateFoodDbInput)}
        ${this.forgeFoodsStatements()}
      `,
      {userId, foodId, ...updateFoodDbInput},
    );
    const food: Food = res.records[0].get('food');
    const result = new UpdateFoodResultDto();
    result.food = food;
    return result;
  }
}
