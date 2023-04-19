import {Injectable} from '@nestjs/common';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {CreateRecipeRequestDto} from './dto/create-recipe-request.dto';
import {CreateRecipeResultDto} from './dto/create-recipe-result.dto';
import {FindAllRecipeResultDto} from './dto/find-all-recipe-result.dto';
import {FindOneRecipeResultDto} from './dto/find-one-recipe-result.dto';
import {UpdateRecipeRequestDto} from './dto/update-recipe-request.dto';
import {CreateRecipeDbInputDto} from './dto/create-recipe-db-input.dto';
import {UpdateRecipeDbInputDto} from './dto/update-recipe-db-input.dto';

const USER = 'User';
const U = 'u';

const UNIT = 'Unit';
const UN = 'un';

const PORTION = 'Portion';
const P = 'p';

const FOOD = 'Food';
const F = 'f';

const RECIPE = 'Recipe';
const R = 'r';

const DIETARY_INFO = 'DietaryInfo';
const DI = 'di';

const PORTION_OF = 'PORTION_OF';
const USED_IN = 'USED_IN';
const MEASURED_IN = 'MEASURED_IN';
const HAS_ACCESS_TO = 'HAS_ACCESS_TO';
const CONTAINS = 'CONTAINS';

// noinspection JSConstantReassignment
@Injectable()
export class RecipesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private createRequestToDbInput(
    createRecipeDto: CreateRecipeRequestDto,
  ): CreateRecipeDbInputDto {
    const createRecipeDbInput = new CreateRecipeDbInputDto();
    createRecipeDbInput.name = createRecipeDto.name;
    createRecipeDbInput.description = createRecipeDto.description;
    createRecipeDbInput.realKcalPerKg = createRecipeDto.realKcalPerKg;
    createRecipeDbInput.realWeightInKg = createRecipeDto.realWeightInKg;
    createRecipeDbInput.portions = createRecipeDto.portions;
    return createRecipeDbInput;
  }
  private forgeRecipesStatements(): string {
    return `
      WITH ${R}, 
        COLLECT({
          id: ${P}.id,
          food:properties(${F}),
          quantity:${P}.quantity,
          description:${P}.description,
          totalKcal: ${P}.quantity*0.001*${DI}.kcalPerKg,
          units:properties(${UN})
        }) as portions,
        sum(${P}.quantity*0.001*${DI}.kcalPerKg) as kcals
      WITH { 
        id: ${R}.id,
        name: ${R}.name,
        description: ${R}.description,
        realKcalPerKg: ${R}.realKcalPerKg,
        realWeightInKg: ${R}.realWeightInKg,
        accumulatedKcal: kcals,
        public: ${R}.public, 
        portions: portions
      } AS recipe
      RETURN recipe
    `;
  }
  async create(
    userId: string,
    createRecipeDto: CreateRecipeRequestDto,
  ): Promise<CreateRecipeResultDto> {
    const createRecipeDbInput = this.createRequestToDbInput(createRecipeDto);
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})
      MERGE (${U})-[:${HAS_ACCESS_TO} {canEdit:True, canDelete:True, createdByUser: True}]->(${R}:${RECIPE} {id: randomUUID()})

      SET ${R}.name = $name
      SET ${R}.description = $description
      SET ${R}.public = False
      SET ${R}.recipe = True
      ${
        createRecipeDbInput.realKcalPerKg
          ? `SET ${R}.realKcalPerKg = $realKcalPerKg`
          : ''
      }
      ${
        createRecipeDbInput.realWeightInKg
          ? `SET ${R}.realWeightInKg = $realWeightInKg`
          : ''
      }

      WITH r
        UNWIND $portions AS portionList
        MATCH (${UN}:${UNIT}) WHERE ${UN}.id = portionList.unitId
        MATCH (${F}:${FOOD}) WHERE ${F}.id = portionList.foodId
        MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F})
        MERGE (${F})<-[:${PORTION_OF}]-(${P}:${PORTION} {id: randomUUID(), quantity: portionList.quantity})-[:${MEASURED_IN}]->(${UN})
        MERGE (${P})-[:${USED_IN}]->(${R})
        SET ${P}.description = 'Portion of ' + ${F}.name
      ${this.forgeRecipesStatements()}
    `;

    const res = await this.neo4jService.write(rStatement, {
      userId,
      ...createRecipeDbInput,
    });

    const recipe = res.records[0].get('recipe');
    const result = new CreateRecipeResultDto();
    result.recipe = recipe;
    return result;
  }

  async findAll(userId: string): Promise<FindAllRecipeResultDto> {
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO}]->(r:${RECIPE})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(${UN}:${UNIT})
      MATCH (${P})-[:${PORTION_OF}]->(${F}:${FOOD})
      MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F})
      ${this.forgeRecipesStatements()}
    `;
    const res = await this.neo4jService.read(rStatement, {
      userId,
    });

    const recipes = res.records.map(el => {
      return el.get('recipe');
    });
    const result = new FindAllRecipeResultDto();
    result.recipes = recipes;
    return result;
  }

  async findOne(
    userId: string,
    recipeId: string,
  ): Promise<FindOneRecipeResultDto> {
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO}]->(${R}:${RECIPE} {id: $recipeId})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(${UN}:${UNIT})
      MATCH (${P})-[:${PORTION_OF}]->(${F}:${FOOD})
      MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F})
      ${this.forgeRecipesStatements()}
    `;
    const res = await this.neo4jService.read(rStatement, {
      userId,
      recipeId,
    });

    const recipe = res.records[0].get('recipe');
    const result = new FindOneRecipeResultDto();
    result.recipe = recipe;
    return result;
  }

  private updateRequestToDbInput(
    updateRecipeDto: UpdateRecipeRequestDto,
  ): UpdateRecipeDbInputDto {
    const updateRecipeDbInput = new UpdateRecipeDbInputDto();
    updateRecipeDbInput.name = updateRecipeDto.name;
    updateRecipeDbInput.description = updateRecipeDto.description;
    updateRecipeDbInput.realKcalPerKg = updateRecipeDto.realKcalPerKg;
    updateRecipeDbInput.realWeightInKg = updateRecipeDto.realWeightInKg;
    return updateRecipeDbInput;
  }

  private forgeUpdateRecipesStatements(
    updateRecipeDto: UpdateRecipeRequestDto,
  ): string {
    return `
      ${updateRecipeDto.name ? `SET ${R}.name = $name` : ''}
      ${
        updateRecipeDto.description ? `SET ${R}.description = $description` : ''
      }
      ${
        updateRecipeDto.realKcalPerKg
          ? `SET ${R}.realKcalPerKg = $realKcalPerKg`
          : ''
      }
      ${
        updateRecipeDto.realWeightInKg
          ? `SET ${R}.realWeightInKg = $realWeightInKg`
          : ''
      }
    `;
  }

  // NOTE: We don't worry about updating food portions here, there's a whole other module dedicated to food portions
  async update(
    userId: string,
    recipeId: string,
    updateRecipeDto: UpdateRecipeRequestDto,
  ) {
    const updateRecipeDbInput = this.updateRequestToDbInput(updateRecipeDto);
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO} {canEdit: True}]->(${R}:${RECIPE} {id: $recipeId})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(${UN}:${UNIT})
      MATCH (${P})-[:${PORTION_OF}]->(${F}:${FOOD})
      MATCH (${DI}:${DIETARY_INFO})<-[:${CONTAINS}]-(${F})

      ${this.forgeUpdateRecipesStatements(updateRecipeDbInput)}
      ${this.forgeRecipesStatements()}
    `;
    console.log('user id', userId);
    console.log('recipe id', recipeId);
    const res = await this.neo4jService.write(rStatement, {
      userId,
      recipeId,
      ...updateRecipeDbInput,
    });
    const recipe = res.records[0].get('recipe');
    const result = new CreateRecipeResultDto();
    result.recipe = recipe;
    return result;
  }
}
