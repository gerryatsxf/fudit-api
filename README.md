## Description

Fudit is an app to easily _check_ the amount of **kcalories** and **macronutrients** _contained_ in your **daily meals** by _allowing_ the **user**
to _select_ the ingested **food portions** of a set of specific **foods** for each individual **meal** in the day. The user can _create_ and _update_ new foods and foods composed of other foods (also known as **recipes**) through food portions.

This application is thought for both **nutritionists** and **patients** alike.

It allows the nutritionist to build a **weekly plan** _consisting_ of multiple sets of daily meals, and then _assign_ these weekly plans to either a single **patient** or many of them. Then it will allow the patient to _generate_ **meal variations** for each individual meal or a set of meals given any user defined **dietary constraints**. After _selecting_ a set of foods or meals, the user can get an **analytical breakdown** of what is _being consumed_.

Finally, this will be a **subscription** paid app, so the nutritionist will have to _subscribe_ and _pay_ for any **package** they seem convenient for them. They can choose between the starter and professional packages.


## Data modelling

1. User can _register_ using an __email__ and __password__.
2. User can _login_ using a previously submitted email and password.

3. User can _read_ a list of previously loaded public lists of __single foods__ that he/she _has access to_
4. User can read the __macronutrients__ and __calories__ contained in each single food being consulted.

5. User can _create_ and _update_ new single foods. 
6. User can _update_ the macronutrients and calories contained in a single food created by him/her.

7. User can _create_ and _update_ new composed foods.
8. User cannot _update_ the macronutrients and calories contained in a composed food created by him/her but can read them.
9. User can _create_ and _update_ a list of __food portions__ that relates the quantities of a set of foods (either single or composed) that compose a composed food.
10. User can _update_ the __units__ and __quantity__ in which each food portion is _measured in_.

11. User can set the amount of calories of macronutrients per __weight__ unit or __volume__ unit
12. User can get the __equivalences__ of a food portion in other units of measurement available.
13. User can _set_ the __prefered unit of measurement__ for each food, which will _default_ unit of measurement for future created portions.
14. User will have option to _update unit of measurement_ of existing portions when selecting a prefered one for a specific food.
15. User can _bulk update_ the unit of measurement for the list of portions in a recipe


## TODO:

- Update food models in order to accomodate unit measurement in both weight and volume
- Update recipe to include information of accumulated macronutrients and calories
- Add @All missing routes to all controllers
- Create a Units module
- Allow to get portions by recipe id
- Allow to bulk edit portions by recipe id (?)


## API

Application created with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
