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

@Injectable()
export class RecipesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private forgeRecipesStatements(): string {
    return `
      WITH r, 
        COLLECT({
          id: p.id,
          food:properties(f),
          quantity:p.quantity,
          description:p.description,
          totalKcal: p.quantity*0.001*f.kcalPerKg,
          unit:properties(units)
        }) as portions,
        sum(p.quantity*0.001*f.kcalPerKg) as kcals
      WITH { 
        id: r.id,
        name: r.name,
        description: r.description,
        realKcalPerKg: r.realKcalPerKg,
        realWeightInKg: r.realWeightInKg,
        accumulatedKcal: kcals,
        public: r.public, 
        recipe: r.recipe,
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
      MATCH (user:User {id: $userId})
      MERGE (user)-[:HAS_ACCESS_TO {canEdit:True, canDelete:True, createdByUser: True}]->(r:Recipe {id: randomUUID()})

      SET r.name = $recipeName
      SET r.description = $recipeDescription
      SET r.public = False
      SET r.recipe = True
      ${realKcalPerKg ? `SET r.realKcalPerKg = $realKcalPerKg` : ''}
      ${realWeightInKg ? `SET r.realWeightInKg = $realWeightInKg` : ''}

      WITH r
        UNWIND $portions AS portionList
        MATCH (units:Unit) WHERE units.id = portionList.unitId
        MATCH (f:Food) WHERE f.id = portionList.foodId
        MERGE (f)<-[:PORTION_OF]-(p:Portion {id: randomUUID(), quantity: portionList.quantity})-[:MEASURED_IN]->(units)
        MERGE (p)-[:USED_IN]->(r)
        SET p.description = 'Portion of ' + f.name
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
      MATCH (u:User {id: $userId})-[:HAS_ACCESS_TO]->(r:Recipe)<-[:USED_IN]-(p:Portion)-[:MEASURED_IN]->(units:Unit)
      MATCH (p)-[:PORTION_OF]->(f:Food)
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
      MATCH (u:User {id: $userId})-[:HAS_ACCESS_TO]->(r:Recipe {id: $recipeId})<-[:USED_IN]-(p:Portion)-[:MEASURED_IN]->(units:Unit)
      MATCH (p)-[:PORTION_OF]->(f:Food)
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
      ${updateRecipeDto.name ? 'SET r.name = $name ' : ''}
      ${updateRecipeDto.description ? 'SET r.description = $description ' : ''}
      ${
        updateRecipeDto.realKcalPerKg
          ? 'SET r.realKcalPerKg = $realKcalPerKg '
          : ''
      }
      ${
        updateRecipeDto.realWeightInKg
          ? 'SET r.realWeightInKg = $realWeightInKg '
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
      MATCH (u:User {id: $userId})-[:HAS_ACCESS_TO]->(r:Recipe {id: $recipeId})<-[:USED_IN]-(p:Portion)-[:MEASURED_IN]->(units:Unit)
      MATCH (p)-[:PORTION_OF]->(f:Food)

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

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
