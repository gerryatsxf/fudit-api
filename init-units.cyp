
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
