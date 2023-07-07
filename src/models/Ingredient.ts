import { IPizza } from "./Pizza";
import { IQueryParams } from "./QueryParams";

interface Ingredient {
    id: string,
    description: string,
    unit: string,
    valuePerUnit: number,
    pizzas?: IPizza[]
}

interface IngredientCreate extends Omit<Ingredient, "id | pizzas"> { }

interface IngredientUpdate extends Omit<Ingredient, "pizzas"> { }

interface IngredientQueryProps extends IQueryParams {
    description?: string
}

interface IIngredientsForPizza extends Omit<Ingredient, "pizzas"> {
    ingredient_quantity: number
}

export {
    Ingredient,
    IngredientCreate,
    IngredientUpdate,
    IngredientQueryProps,
    IIngredientsForPizza
};