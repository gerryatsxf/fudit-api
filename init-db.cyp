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
