
// UNITS
// WEIGHT
MERGE (milligram:Unit {id: randomUUID(), name: 'milligram', key: 'mg'})
MERGE (gram:Unit {id: randomUUID(), name: 'gram', key: 'g'})
MERGE (kilogram:Unit {id: randomUUID(), name: 'kilogram', key: 'kg'})
// Miligram equivalences
MERGE (milligram)-[:EQUIVALENT_TO {factor: 1000}]->(gram)
MERGE (milligram)-[:EQUIVALENT_TO {factor: 1000000}]->(kilogram)
// Gram equivalences
MERGE (gram)-[:EQUIVALENT_TO {factor: 1000}]->(milligram)
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
MERGE (cup)-[:EQUIVALENT_TO {factor: 250}]->(milliliter)
MERGE (cup)-[:EQUIVALENT_TO {factor: 0.25}]->(liter)
// Liter equivalences
MERGE (liter)-[:EQUIVALENT_TO {factor: 1000}]->(milliliter)
MERGE (liter)-[:EQUIVALENT_TO {factor: 4}]->(cup)


// Besciamella
MERGE (flour:Food {id: randomUUID()})
flour.name = 'Flour'
flour.description = 'Powder obtained by grinding wheat, used to make pasta, bread, and pastry'
flour.public = True
MERGE (flourInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(flour)
flourInfo.description = flour.name + ' nutritional information'
flourInfo.proteinsPerKg = 103.0 
flourInfo.carbohydratesPerKg = 763.0
flourInfo.lipidsPerKg = 120.0
flourInfo.kcalPerKg = 3640.0
flourInfo.proteinsPerLt = null
flourInfo.carbohydratesPerLt = null
flourInfo.lipidsPerLt = null
flourInfo.kcalPerLt = null

MERGE (milk:Food {id: randomUUID()})
milk.name = 'Milk'
milk.description = 'White liquid produced by the mammary glands of mammals, used as a source of nutrition'
milk.public = True
MERGE (milkInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(milk)
milkInfo.description = milk.name + ' nutritional information'
milkInfo.proteinsPerKg = 34.0 
milkInfo.carbohydratesPerKg = 48.0
milkInfo.lipidsPerKg = 37.0
milkInfo.kcalPerKg = 640.0
milkInfo.proteinsPerLt = null
milkInfo.carbohydratesPerLt = null
milkInfo.lipidsPerLt = null
milkInfo.kcalPerLt = null

MERGE (butter:Food {id: randomUUID()})
butter.name = 'Butter'
butter.description = 'Dairy product made by churning cream or milk, used as a spread and in cooking'
butter.public = True
MERGE (butterInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(butter)
butterInfo.description = butter.name + ' nutritional information'
butterInfo.proteinsPerKg = 6.0 
butterInfo.carbohydratesPerKg = 7.0
butterInfo.lipidsPerKg = 810.0
butterInfo.kcalPerKg = 7170.0
butterInfo.proteinsPerLt = null
butterInfo.carbohydratesPerLt = null
butterInfo.lipidsPerLt = null
butterInfo.kcalPerLt = null

MERGE (parmiggiano:Food {id: randomUUID()})
parmiggiano.name = 'Parmiggiano'
parmiggiano.description = 'Hard, granular cheese, often used in Italian dishes like pasta and risotto'
parmiggiano.public = True
MERGE (parmiggianoInfo:DietaryInfo {id: randomUUID()})<-[:CONTAINS]-(parmiggiano)
parmiggianoInfo.description = parmiggiano.name + ' nutritional information'
parmiggianoInfo.proteinsPerKg = 357.0 
parmiggianoInfo.carbohydratesPerKg = 14.0
parmiggianoInfo.lipidsPerKg = 284.0
parmiggianoInfo.kcalPerKg = 4310.0
parmiggianoInfo.proteinsPerLt = null
parmiggianoInfo.carbohydratesPerLt = null
parmiggianoInfo.lipidsPerLt = null
parmiggianoInfo.kcalPerLt = null

MERGE (besciamella:Recipe {id: randomUUID()})
besciamella.name = 'Besciamella'
besciamella.description = 'Base for many other sauces, including Mornay sauce, which is just béchamel with cheese, added to it'
besciamella.public = True
besciamella.realKcalPerKg = null
besciamella.realKcalPerLt = null
besciamella.instructions = 'Cook everything in a pot.'

MERGE (flourPortion:Portion {id: randomUUID()})
flourPortion.quantity = 10
flourPortion.description = 'Portion of ' + flour.name
(flourPortion)-[:${PORTION_OF}]->(flour)
(flourPortion)-[:USED_IN]->(besciamella)
(flourPortion)-[:MEASURED_IN]->(gram)

MERGE (milkPortion:Portion {id: randomUUID()})
milkPortion.quantity = 10
milkPortion.description = 'Portion of ' + milk.name
(milkPortion)-[:${PORTION_OF}]->(milk)
(milkPortion)-[:USED_IN]->(besciamella)
(milkPortion)-[:MEASURED_IN]->(gram)

MERGE (butterPortion:Portion {id: randomUUID()})
butterPortion.quantity = 10
butterPortion.description = 'Portion of ' + butter.name
(butterPortion)-[:${PORTION_OF}]->(butter)
(butterPortion)-[:USED_IN]->(besciamella)
(butterPortion)-[:MEASURED_IN]->(gram)

MERGE (parmiggianoPortion:Portion {id: randomUUID()})
parmiggianoPortion.quantity = 10
parmiggianoPortion.description = 'Portion of ' + parmiggiano.name
(parmiggianoPortion)-[:${PORTION_OF}]->(parmiggiano)
(parmiggianoPortion)-[:USED_IN]->(besciamella)
(parmiggianoPortion)-[:MEASURED_IN]->(gram)

