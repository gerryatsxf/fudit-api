CREATE CONSTRAINT unique_user_email FOR (u:User) REQUIRE u.email IS UNIQUE
CREATE CONSTRAINT unique_package_id FOR (p:Package) REQUIRE p.id IS UNIQUE
CREATE CONSTRAINT unique_subscription_id FOR (s:Subscription) REQUIRE s.id IS UNIQUE
CREATE CONSTRAINT unique_food_id FOR (f:Food) REQUIRE f.id IS UNIQUE
CREATE CONSTRAINT unique_unit_id FOR (u:Unit) REQUIRE u.id IS UNIQUE
CREATE CONSTRAINT unique_unit_abbreviation FOR (u:Unit) REQUIRE u.abbreviation IS UNIQUE

MERGE (p1:Package {name:'Free trial',price:'0 USD',month:1})
MERGE (p2:Package {name:'Starter',price:'5 USD',month:1}) 
MERGE (p3:Package {name:'Professional',price:'10 USD',month:1}) 

SHOW CONSTRAINTS

DROP CONSTRAINT unique_user_email







// SINGLE FOODS

// Ragu
MERGE (wine:Food {id: randomUUID(), name:'Wine', description: 'Alcoholic beverage made from fermented grapes', public: True, kcalPerKg: 830.0, recipe: False})
MERGE (wineConfig:MacronutrientConfig {id: randomUUID(), description: wine.name + ' macronutrients', proteinsPerKg: 0.7, carbohydratesPerKg: 0.3, lipidsPerKg: 0.0})<-[:CONTAINS]-(wine)

MERGE (carrot:Food {id: randomUUID(), name:'Carrot', description: 'Root vegetable that is high in vitamins and fiber', public: True, kcalPerKg: 410.0, recipe: False})
MERGE (carrotConfig:MacronutrientConfig {id: randomUUID(), description: carrot.name + ' macronutrients', proteinsPerKg: 9.3, carbohydratesPerKg: 95.8, lipidsPerKg: 2.4})<-[:CONTAINS]-(carrot)

MERGE (onion:Food {id: randomUUID(), name:'Onion', description: 'Vegetable commonly used in cooking as a flavoring ingredient', public: True, kcalPerKg: 400.0, recipe: False})
MERGE (onionConfig:MacronutrientConfig {id: randomUUID(), description: onion.name + ' macronutrients', proteinsPerKg: 11.0, carbohydratesPerKg: 93.4, lipidsPerKg: 1.0})<-[:CONTAINS]-(onion)

MERGE (garlic:Food {id: randomUUID(), name:'Garlic', description: 'Plant used as a seasoning in cooking', public: True, kcalPerKg: 1490.0, recipe: False})
MERGE (garlicConfig:MacronutrientConfig {id: randomUUID(), description: garlic.name + ' macronutrients', proteinsPerKg: 63.6, carbohydratesPerKg: 330.6, lipidsPerKg: 5.0})<-[:CONTAINS]-(garlic)

MERGE (groundMeat:Food {id: randomUUID(), name:'Ground meat', description: 'Meat that has been finely chopped or ground', public: True, kcalPerKg: 2250.0, recipe: False})
MERGE (groundMeatConfig:MacronutrientConfig {id: randomUUID(), description: groundMeat.name + ' macronutrients', proteinsPerKg: 194.0, carbohydratesPerKg: 0, lipidsPerKg: 165.0})<-[:CONTAINS]-(groundMeat)

MERGE (passata:Food {id: randomUUID(), name:'Passata', description: 'Tomato puree that has been strained of seeds and skins', public: True, kcalPerKg: 330.0, recipe: False})
MERGE (passataConfig:MacronutrientConfig {id: randomUUID(), description: passata.name + ' macronutrients', proteinsPerKg: 15.0, carbohydratesPerKg: 70.0, lipidsPerKg: 0.0})<-[:CONTAINS]-(passata)

// Olive oil
MERGE (oliveOil:Food {id: randomUUID(), name:'Olive oil', description: 'Oil made from pressed olives', public: True, kcalPerKg: 8840.0, recipe: False})
MERGE (oliveOilConfig:MacronutrientConfig {id: randomUUID(), description: oliveOil.name + ' macronutrients', proteinsPerKg: 0.0, carbohydratesPerKg: 0.0, lipidsPerKg: 1000.0})<-[:CONTAINS]-(oliveOil)

// Besciamella
MERGE (flour:Food {id: randomUUID(), name:'Flour', description: 'Powder obtained by grinding wheat, used to make pasta, bread, and pastry', public: True, kcalPerKg: 3640.0, recipe: False})
MERGE (flourConfig:MacronutrientConfig {id: randomUUID(), description: flour.name + ' macronutrients', proteinsPerKg: 103.0, carbohydratesPerKg: 763.0, lipidsPerKg: 120.0})<-[:CONTAINS]-(flour)

MERGE (milk:Food {id: randomUUID(), name:'Milk', description: 'White liquid produced by the mammary glands of mammals, used as a source of nutrition', public: True, kcalPerKg: 640.0, recipe: False})
MERGE (milkConfig:MacronutrientConfig {id: randomUUID(), description: milk.name + ' macronutrients', proteinsPerKg: 34.0, carbohydratesPerKg: 48.0, lipidsPerKg: 37.0})<-[:CONTAINS]-(milk)

MERGE (butter:Food {id: randomUUID(), name:'Butter', description: 'Dairy product made by churning cream or milk, used as a spread and in cooking', public: True, kcalPerKg: 7170.0, recipe: False})
MERGE (butterConfig:MacronutrientConfig {id: randomUUID(), description: butter.name + ' macronutrients', proteinsPerKg: 6.0, carbohydratesPerKg: 7.0, lipidsPerKg: 810.0})<-[:CONTAINS]-(butter)

MERGE (parmiggiano:Food {id: randomUUID(), name:'Parmiggiano', description: 'Hard, granular cheese, often used in Italian dishes like pasta and risotto', public: True, kcalPerKg: 4310.0, recipe: False})
MERGE (parmiggianoConfig:MacronutrientConfig {id: randomUUID(), description: parmiggiano.name + ' macronutrients', proteinsPerKg: 357.0, carbohydratesPerKg: 14.0, lipidsPerKg: 284.0})<-[:CONTAINS]-(parmiggiano)

// Lasagne al ragu
MERGE (mozzarella:Food {id: randomUUID(), name:'Mozzarella', description: 'Soft, white cheese with a mild flavor and stringy texture, often used on pizza', public: True, kcalPerKg: 2800.0, recipe: False})
MERGE (mozzarellaConfig:MacronutrientConfig {id: randomUUID(), description: mozzarella.name + ' macronutrients', proteinsPerKg: 220.0, carbohydratesPerKg: 22.0, lipidsPerKg: 190.0})<-[:CONTAINS]-(mozzarella)

MERGE (lasagne:Food {id: randomUUID(), name:'Lasagne', description: 'Flat, wide pasta sheets, often layered with sauce and cheese to make a baked dish', public: True, kcalPerKg: 1310.0, recipe: False})
MERGE (lasagneConfig:MacronutrientConfig {id: randomUUID(), description: lasagne.name + ' macronutrients', proteinsPerKg: 34.0, carbohydratesPerKg: 274.0, lipidsPerKg: 13.0})<-[:CONTAINS]-(lasagne)

// Pasta al ragu
MERGE (pasta:Food {id: randomUUID(), name:'Pasta', description: 'Food made from dough, often shaped into various forms and cooked in boiling water', public: True, kcalPerKg: 3710.0, recipe: False})
MERGE (pastaConfig:MacronutrientConfig {id: randomUUID(), description: pasta.name + ' macronutrients', proteinsPerKg: 35.0, carbohydratesPerKg: 777.0, lipidsPerKg: 15.0})<-[:CONTAINS]-(pasta)

// Pizza dough
MERGE (instantYeast:Food {id: randomUUID(), name:'Instant yeast', description: 'Dried yeast product that can be used directly in recipes without being activated in water first', public: True, kcalPerKg: 3210.0, recipe: False})
MERGE (instantYeastConfig:MacronutrientConfig {id: randomUUID(), description: instantYeast.name + ' macronutrients', proteinsPerKg: 430.8, carbohydratesPerKg: 499.0, lipidsPerKg: 16.0})<-[:CONTAINS]-(instantYeast)

// Pizza sauce
MERGE (basil:Food {id: randomUUID(), name:'Basil', description: 'Aromatic herb commonly used in Mediterranean cuisine, often used in pizza toppings and pasta sauces', public: True, kcalPerKg: 230.0, recipe: False})
MERGE (basilConfig:MacronutrientConfig {id: randomUUID(), description: basil.name + ' macronutrients', proteinsPerKg: 31.5, carbohydratesPerKg: 26.5, lipidsPerKg: 6.4})<-[:CONTAINS]-(basil)

// Pizza
MERGE (pineapple:Food {id: randomUUID(), name: 'Pineapple', description: 'Tropical fruit with a sweet, juicy flesh, often used as a pizza topping in some regions', public: True, kcalPerKg: 500.0, recipe: False})
MERGE (pineappleConfig:MacronutrientConfig {id: randomUUID(), description: pineapple.name + ' macronutrients', proteinsPerKg: 5.4, carbohydratesPerKg: 131.2, lipidsPerKg: 1.2})<-[:CONTAINS]-(pineapple)



// FOOD UNITS
MERGE (gram:Unit {id: randomUUID(), name: 'gram', abbreviation: 'g'})

MERGE (kilogram:Unit {id: randomUUID(), name: 'kilogram', abbreviation: 'kg'})
MERGE (kilogram)-[:EQUIVALENT_TO {factor: 1000}]->(gram)

MERGE (milligram:Unit {id: randomUUID(), name: 'milligram', abbreviation: 'mg'})
MERGE (milligram)-[:EQUIVALENT_TO {factor: 0.001}]->(gram)

MERGE (liter:Unit {id: randomUUID(), name: 'liter', abbreviation: 'L'})

MERGE (milliliter:Unit {id: randomUUID(), name: 'milliliter', abbreviation: 'mL'})
MERGE (milliliter)-[:EQUIVALENT_TO {factor: 0.001}]->(liter)

MERGE (cup:Unit {id: randomUUID(), name: 'cup', abbreviation: 'c'})
MERGE (cup)-[:EQUIVALENT_TO {factor: 240}]->(milliliter)

MERGE (teaspoon:Unit {id: randomUUID(), name: 'teaspoon', abbreviation: 'tsp'})

MERGE (tablespoon:Unit {id: randomUUID(), name: 'tablespoon', abbreviation: 'tbsp'})
