import {Injectable} from '@nestjs/common';
import {FindAllFoodResult} from 'src/foods/dto/find-all-food-result.dto';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {CreateRecipeRequestDto} from './dto/create-recipe-request.dto';
import {CreateRecipeResponseDto} from './dto/create-recipe-response.dto';
import {CreateRecipeResultDto} from './dto/create-recipe-result.dto';
import {FindAllRecipeResultDto} from './dto/find-all-recipe-result.dto';
import {FindOneRecipeResultDto} from './dto/find-one-recipe-result.dto';
import {CreateFoodPortionRequestDto} from './dto/create-food-portion-request.dto';
import {UpdateRecipeRequestDto} from './dto/update-recipe-request.dto';
import {Recipe} from './entities/recipe.entity';

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

const PORTION_OF = 'PORTION_OF';
const USED_IN = 'USED_IN';
const MEASURED_IN = 'MEASURED_IN';
const HAS_ACCESS_TO = 'HAS_ACCESS_TO';

@Injectable()
export class RecipesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private forgeRecipesStatements(): string {
    return `
      WITH r, 
        COLLECT({
          id: ${P}.id,
          food:properties(${F}),
          quantity:${P}.quantity,
          description:${P}.description,
          totalKcal: ${P}.quantity*0.001*${F}.kcalPerKg,
          ${UN}:properties(units)
        }) as portions,
        sum(${P}.quantity*0.001*${F}.kcalPerKg) as kcals
      WITH { 
        id: ${R}.id,
        name: ${R}.name,
        description: ${R}.description,
        realKcalPerKg: ${R}.realKcalPerKg,
        realWeightInKg: ${R}.realWeightInKg,
        accumulatedKcal: kcals,
        public: ${R}.public, 
        recipe: ${R}.recipe,
        portions: portions
      } AS recipe
      RETURN recipe
    `;
  }
  async create(
    userId: string,
    createRecipeDto: CreateRecipeRequestDto,
  ): Promise<CreateRecipeResultDto> {
    const recipeName = createRecipeDto.name;
    const recipeDescription = createRecipeDto.description;
    const realKcalPerKg = createRecipeDto.realKcalPerKg;
    const realWeightInKg = createRecipeDto.realWeightInKg;
    const portions = createRecipeDto.portions;

    const rStatement = `
      // MATCH (${U}:${USER} {id: $userId})
      MERGE (${U})-[:${HAS_ACCESS_TO} {canEdit:True, canDelete:True, createdByUser: True}]->(r:${RECIPE} {id: randomUUID()})

      SET ${R}.name = $recipeName
      SET ${R}.description = $recipeDescription
      SET ${R}.public = False
      SET ${R}.recipe = True
      ${realKcalPerKg ? `SET ${R}.realKcalPerKg = $realKcalPerKg` : ''}
      ${realWeightInKg ? `SET ${R}.realWeightInKg = $realWeightInKg` : ''}

      WITH r
        UNWIND $portions AS portionList
        MATCH (units:${UNIT}) WHERE units.id = portionList.unitId
        MATCH (${F}:Food) WHERE ${F}id = portionList.foodId
        MERGE (${F})<-[:${PORTION}_OF]-(${P}:${PORTION} {id: randomUUID(), quantity: portionList.quantity})-[:${MEASURED_IN}]->(units)
        MERGE (${P})-[:${USED_IN}]->(${R})
        SET ${P}.description = 'Portion of ' + ${F}name
      ${this.forgeRecipesStatements()}
    `;

    const res = await this.neo4jService.write(rStatement, {
      userId,
      recipeName,
      recipeDescription,
      realKcalPerKg,
      realWeightInKg,
      portions,
    });

    const recipe = res.records[0].get('recipe');
    const result = new CreateRecipeResultDto();
    result.recipe = recipe;
    return result;
  }

  async findAll(userId: string): Promise<FindAllRecipeResultDto> {
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO}]->(r:${RECIPE})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(units:${UNIT})
      MATCH (${P})-[:${PORTION}_OF]->(${F}:${FOOD}
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
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO}]->(${R}:${RECIPE} {id: $recipeId})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(units:${UNIT})
      MATCH (${P})-[:${PORTION_OF}]->(${F}:${FOOD})
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
    const rStatement = `
      MATCH (${U}:${USER} {id: $userId})-[:${HAS_ACCESS_TO}]->(r:${RECIPE} {id: $recipeId})<-[:${USED_IN}]-(${P}:${PORTION})-[:${MEASURED_IN}]->(units:${UNIT})
      MATCH (${P})-[:${PORTION_OF}]->(${F}:${FOOD})

      ${this.forgeUpdateRecipesStatements(updateRecipeDto)}

      ${this.forgeRecipesStatements()}
    `;

    const res = await this.neo4jService.write(rStatement, {
      userId,
      recipeId,
      ...updateRecipeDto,
    });

    const recipe = res.records[0].get('recipe');
    const result = new CreateRecipeResultDto();
    result.recipe = recipe;
    return result;
  }

}
