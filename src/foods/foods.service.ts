import {Injectable} from '@nestjs/common';
import {Neo4jService} from 'src/neo4j/neo4j.service';
import {CreateFoodRequestDto} from './dto/create-food-request.dto';
import {UpdateFoodRequestDto} from './dto/update-food-request.dto';
import {CreateFoodResultDto} from './dto/create-food-result.dto';
import {UpdateFoodResultDto} from './dto/update-food-result.dto';
import {FindOneFoodResultDto} from './dto/find-one-food-result.dto';
import {Food} from './entities/food.entity';
import {FindAllFoodResult} from './dto/find-all-food-result.dto';

@Injectable()
export class FoodsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private createFoodPropertiesStatements(): string {
    return `
      SET f.public = False
      SET f.recipe = False
      SET f.name = $foodName
      SET f.description = $foodDescription
      SET f.kcalPerKg = $kcalPerKg
      
      SET m.description = f.name + ' macronutrients'
      SET m.carbohydratesPerKg = $carbohydratesPerKg
      SET m.proteinsPerKg = $proteinsPerKg
      SET m.lipidsPerKg = $lipidsPerKg
    `;
  }
  async create(
    userId: string,
    createFoodDto: CreateFoodRequestDto,
  ): Promise<CreateFoodResultDto> {
    const foodName = createFoodDto.name;
    const foodDescription = createFoodDto.description;
    const kcalPerKg = createFoodDto.kcalPerKg;
    const carbohydratesPerKg = createFoodDto.carbohydratesPerKg;
    const proteinsPerKg = createFoodDto.proteinsPerKg;
    const lipidsPerKg = createFoodDto.lipidsPerKg;

    const res = await this.neo4jService.write(
      `
        MATCH (u:User {id: $userId})
        MERGE (u)-[:HAS_ACCESS_TO {canEdit:True, canDelete:True, createdByUser: True}]->(f:Food {id: randomUUID()})
        MERGE (f)-[:CONTAINS]->(m:MacronutrientConfig {id:randomUUID()})
        ${this.createFoodPropertiesStatements()}
        ${this.forgeFoodsStatements()}
      `,
      {
        userId,
        foodName,
        foodDescription,
        kcalPerKg,
        carbohydratesPerKg,
        proteinsPerKg,
        lipidsPerKg,
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
        id: f.id,
        name: f.name,
        description: f.description,
        kcalPerKg: f.kcalPerKg,
        public: f.public, 
        recipe: f.recipe,
        macronutrients: {
                proteinsPerKg: m.proteinsPerKg,
                carbohydratesPerKg: m.carbohydratesPerKg,
                lipidsPerKg: m.lipidsPerKg
        }
      } AS food
      RETURN food
    `;
  }
  async findAll(userId: string): Promise<FindAllFoodResult> {
    const res = await this.neo4jService.read(
      `
        MATCH (m:MacronutrientConfig)<-[:CONTAINS]-(f:Food)<-[:HAS_ACCESS_TO]-(u:User {id: $userId})
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
        MATCH (m:MacronutrientConfig)<-[:CONTAINS]-(f:Food {id: $foodId})<-[:HAS_ACCESS_TO]-(u:User {id: $userId})
        ${this.forgeFoodsStatements()}
      `,
      {foodId, userId},
    );

    const food: Food = res.records[0].get('food');
    const result = new FindOneFoodResultDto();
    result.food = food;
    return result;
  }

  private forgeUpdateFoodsStatements(
    updateFoodDto: UpdateFoodRequestDto,
  ): string {
    return `
      ${updateFoodDto.name ? 'SET f.name = $name ' : ''}
      ${updateFoodDto.description ? 'SET f.description = $description ' : ''}
      ${updateFoodDto.kcalPerKg ? 'SET f.kcalPerKg = $kcalPerKg ' : ''}

      ${
        updateFoodDto.name
          ? `
          SET m.description = f.name + " macronutrients" 
          SET p.description = 'Portion of ' + f.name
          `
          : ''
      }
      ${
        updateFoodDto.carbohydratesPerKg
          ? 'SET m.carbohydratesPerKg = $carbohydratesPerKg '
          : ''
      }
      ${
        updateFoodDto.proteinsPerKg
          ? 'SET m.proteinsPerKg = $proteinsPerKg '
          : ''
      }
      ${updateFoodDto.lipidsPerKg ? 'SET m.lipidsPerKg = $lipidsPerKg ' : ''}
    `;
  }

  async update(
    userId: string,
    foodId: string,
    updateFoodDto: UpdateFoodRequestDto,
  ): Promise<UpdateFoodResultDto> {
    const res = await this.neo4jService.write(
      `
        MATCH (m:MacronutrientConfig)<-[:CONTAINS]-(f:Food {id: $foodId})<-[:HAS_ACCESS_TO]-(u:User {id: $userId})
        MATCH (p:Portion)-[:PORTION_OF]->(f)
        ${this.forgeUpdateFoodsStatements(updateFoodDto)}
        ${this.forgeFoodsStatements()}
      `,
      {userId, foodId, ...updateFoodDto},
    );

    const food: Food = res.records[0].get('food');
    const result = new UpdateFoodResultDto();
    result.food = food;
    return result;
  }
}
