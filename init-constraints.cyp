// User 
CREATE CONSTRAINT unique_user_id FOR (user:User) REQUIRE user.id IS UNIQUE
CREATE CONSTRAINT unique_user_email FOR (user:User) REQUIRE user.email IS UNIQUE

// Single Food
CREATE CONSTRAINT unique_single_food_id FOR (food:Food) REQUIRE food.id IS UNIQUE

// Unit
CREATE CONSTRAINT unique_unit_id FOR (unit:Unit) REQUIRE unit.id IS UNIQUE
CREATE CONSTRAINT unique_unit_key FOR (unit:Unit) REQUIRE unit.key IS UNIQUE

// Dietary Info
CREATE CONSTRAINT unique_dietary_info_id FOR (dietaryInfo:DietaryInfo) REQUIRE dietaryInfo.id IS UNIQUE

// Forged Food
CREATE CONSTRAINT unique_forged_food_id FOR (recipe:Recipe) REQUIRE recipe.id IS UNIQUE

// Portion
CREATE CONSTRAINT unique_portion_id FOR (portion:Portion) REQUIRE portion.id IS UNIQUE

SHOW CONSTRAINTS