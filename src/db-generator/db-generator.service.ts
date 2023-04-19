import {Injectable} from '@nestjs/common';
import {Neo4jService} from '../neo4j/neo4j.service';

@Injectable()
export class DbGeneratorService {
  constructor(private readonly neo4jService: Neo4jService) {}
  initGraphs(): Promise<any> {
    const statement = `
      // UNITS
      // WEIGHT
      MERGE (milligram:Unit {id: randomUUID(), name: 'milligram', key: 'mg'})
      MERGE (gram:Unit {id: randomUUID(), name: 'gram', key: 'g'})
      MERGE (kilogram:Unit {id: randomUUID(), name: 'kilogram', key: 'kg'})
      // Milligram equivalences
      MERGE (milligram)-[:EQUIVALENT_TO {factor: 1000.0}]->(gram)
      MERGE (milligram)-[:EQUIVALENT_TO {factor: 1000000.0}]->(kilogram)
      // Gram equivalences
      MERGE (gram)-[:EQUIVALENT_TO {factor: 1000.0}]->(milligram)
      MERGE (gram)-[:EQUIVALENT_TO {factor: 0.001}]->(kilogram)
      // Kilogram equivalences
      MERGE (kilogram)-[:EQUIVALENT_TO {factor: 0.000001}]->(milligram)
      MERGE (kilogram)-[:EQUIVALENT_TO {factor: 0.001}]->(gram)
      // VOLUME
      MERGE (milliliter:Unit {id: randomUUID(), name: 'milliliter', key: 'mL'})
      MERGE (cup:Unit {id: randomUUID(), name: 'cup', key: 'c'})
      MERGE (liter:Unit {id: randomUUID(), name: 'liter', key: 'L'})
      // Milliliter equivalences
      MERGE (milliliter)-[:EQUIVALENT_TO {factor: 0.004}]->(cup)
      MERGE (milliliter)-[:EQUIVALENT_TO {factor: 0.001}]->(liter)
      // Cup equivalences
      MERGE (cup)-[:EQUIVALENT_TO {factor: 250.0}]->(milliliter)
      MERGE (cup)-[:EQUIVALENT_TO {factor: 0.25}]->(liter)
      // Liter equivalences
      MERGE (liter)-[:EQUIVALENT_TO {factor: 1000.0}]->(milliliter)
      MERGE (liter)-[:EQUIVALENT_TO {factor: 4.0}]->(cup)
      
      
      // Besciamella
      MERGE (flour:Food {id: randomUUID()})
      SET flour.name = 'Flour'
      SET flour.description = 'Powder obtained by grinding wheat, used to make pasta, bread, and pastry'
      SET flour.public = True
      MERGE (flourInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(flour)
      SET flourInfo.description = flour.name + ' nutritional information'
      SET flourInfo.proteinsPerKg = 103.0 
      SET flourInfo.carbohydratesPerKg = 763.0
      SET flourInfo.lipidsPerKg = 120.0
      SET flourInfo.kcalPerKg = 3640.0
      SET flourInfo.proteinsPerLt = null
      SET flourInfo.carbohydratesPerLt = null
      SET flourInfo.lipidsPerLt = null
      SET flourInfo.kcalPerLt = null
      
      MERGE (milk:Food {id: randomUUID()})
      SET milk.name = 'Milk'
      SET milk.description = 'White liquid produced by the mammary glands of mammals, used as a source of nutrition'
      SET milk.public = True
      MERGE (milkInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(milk)
      SET milkInfo.description = milk.name + ' nutritional information'
      SET milkInfo.proteinsPerKg = 34.0 
      SET milkInfo.carbohydratesPerKg = 48.0
      SET milkInfo.lipidsPerKg = 37.0
      SET milkInfo.kcalPerKg = 640.0
      SET milkInfo.proteinsPerLt = null
      SET milkInfo.carbohydratesPerLt = null
      SET milkInfo.lipidsPerLt = null
      SET milkInfo.kcalPerLt = null
      
      MERGE (butter:Food {id: randomUUID()})
      SET butter.name = 'Butter'
      SET butter.description = 'Dairy product made by churning cream or milk, used as a spread and in cooking'
      SET butter.public = True
      MERGE (butterInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(butter)
      SET butterInfo.description = butter.name + ' nutritional information'
      SET butterInfo.proteinsPerKg = 6.0 
      SET butterInfo.carbohydratesPerKg = 7.0
      SET butterInfo.lipidsPerKg = 810.0
      SET butterInfo.kcalPerKg = 7170.0
      SET butterInfo.proteinsPerLt = null
      SET butterInfo.carbohydratesPerLt = null
      SET butterInfo.lipidsPerLt = null
      SET butterInfo.kcalPerLt = null
      
      MERGE (parmiggiano:Food {id: randomUUID()})
      SET parmiggiano.name = 'Parmiggiano'
      SET parmiggiano.description = 'Hard, granular cheese, often used in Italian dishes like pasta and risotto'
      SET parmiggiano.public = True
      MERGE (parmiggianoInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(parmiggiano)
      SET parmiggianoInfo.description = parmiggiano.name + ' nutritional information'
      SET parmiggianoInfo.proteinsPerKg = 357.0 
      SET parmiggianoInfo.carbohydratesPerKg = 14.0
      SET parmiggianoInfo.lipidsPerKg = 284.0
      SET parmiggianoInfo.kcalPerKg = 4310.0
      SET parmiggianoInfo.proteinsPerLt = null
      SET parmiggianoInfo.carbohydratesPerLt = null
      SET parmiggianoInfo.lipidsPerLt = null
      SET parmiggianoInfo.kcalPerLt = null
      
      MERGE (besciamella:Recipe {id: randomUUID()})
      SET besciamella.name = 'Besciamella'
      SET besciamella.description = 'Base for many other sauces, including Mornay sauce, which is just béchamel with cheese, added to it'
      SET besciamella.public = True
      SET besciamella.realKcalPerKg = null
      SET besciamella.realKcalPerLt = null
      SET besciamella.instructions = 'Cook everything in a pot.'
      
      MERGE (flourPortion:Portion {id: randomUUID()})
      SET flourPortion.quantity = 10.0
      SET flourPortion.description = 'Portion of ' + flour.name
      MERGE (flourPortion)-[:PORTION_OF]->(flour)
      MERGE (flourPortion)-[:USED_IN]->(besciamella)
      MERGE (flourPortion)-[:MEASURED_IN]->(gram)
      
      MERGE (milkPortion:Portion {id: randomUUID()})
      SET milkPortion.quantity = 10.0
      SET milkPortion.description = 'Portion of ' + milk.name
      MERGE (milkPortion)-[:PORTION_OF]->(milk)
      MERGE (milkPortion)-[:USED_IN]->(besciamella)
      MERGE (milkPortion)-[:MEASURED_IN]->(gram)
      
      MERGE (butterPortion:Portion {id: randomUUID()})
      SET butterPortion.quantity = 10.0
      SET butterPortion.description = 'Portion of ' + butter.name
      MERGE (butterPortion)-[:PORTION_OF]->(butter)
      MERGE (butterPortion)-[:USED_IN]->(besciamella)
      MERGE (butterPortion)-[:MEASURED_IN]->(gram)
      
      MERGE (parmiggianoPortion:Portion {id: randomUUID()})
      SET parmiggianoPortion.quantity = 10.0
      SET parmiggianoPortion.description = 'Portion of ' + parmiggiano.name
      MERGE (parmiggianoPortion)-[:PORTION_OF]->(parmiggiano)
      MERGE (parmiggianoPortion)-[:USED_IN]->(besciamella)
      MERGE (parmiggianoPortion)-[:MEASURED_IN]->(gram)
    `;
    return this.neo4jService.write(statement);
  }
  deleteGraphs(): Promise<any> {
    const statement = `
      MATCH (n)-[r]-()
      MATCH (s)
      DELETE n, r, s
    `;
    return this.neo4jService.write(statement);
  }
  async initConstraints(): Promise<any> {
    const statements = [
      `CREATE CONSTRAINT unique_user_id FOR (user:User) REQUIRE user.id IS UNIQUE`,
      `CREATE CONSTRAINT unique_user_email FOR (user:User) REQUIRE user.email IS UNIQUE`,
      `CREATE CONSTRAINT unique_single_food_id FOR (food:Food) REQUIRE food.id IS UNIQUE`,
      `CREATE CONSTRAINT unique_unit_id FOR (unit:Unit) REQUIRE unit.id IS UNIQUE`,
      `CREATE CONSTRAINT unique_unit_key FOR (unit:Unit) REQUIRE unit.key IS UNIQUE`,
      `CREATE CONSTRAINT unique_dietary_info_id FOR (dietaryInfo:DietaryInfo) REQUIRE dietaryInfo.id IS UNIQUE`,
      `CREATE CONSTRAINT unique_forged_food_id FOR (recipe:Recipe) REQUIRE recipe.id IS UNIQUE`,
      `CREATE CONSTRAINT unique_portion_id FOR (portion:Portion) REQUIRE portion.id IS UNIQUE`,
      `SHOW CONSTRAINTS`,
    ];
    for (const statement of statements) {
      await this.neo4jService.write(statement);
    }
    return this.neo4jService.read(`SHOW CONSTRAINTS`);
  }

  async deleteConstraints(): Promise<any> {
    const statements = [
      `DROP CONSTRAINT unique_user_id IF EXISTS`,
      `DROP CONSTRAINT unique_user_email IF EXISTS`,
      `DROP CONSTRAINT unique_single_food_id IF EXISTS`,
      `DROP CONSTRAINT unique_unit_id IF EXISTS`,
      `DROP CONSTRAINT unique_unit_key IF EXISTS`,
      `DROP CONSTRAINT unique_dietary_info_id IF EXISTS`,
      `DROP CONSTRAINT unique_forged_food_id IF EXISTS`,
      `DROP CONSTRAINT unique_portion_id IF EXISTS`,
    ];
    for (const statement of statements) {
      await this.neo4jService.write(statement);
    }
    return this.neo4jService.read(`SHOW CONSTRAINTS`);
  }
}
