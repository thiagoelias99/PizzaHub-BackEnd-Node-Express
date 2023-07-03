import { IQueryParams } from "./QueryParams";

interface Ingredient {
    id: string,
    description: string,
    value: number
}

interface IngredientCreate extends Omit<Ingredient, "id"> {}

interface IngredientQueryProps extends IQueryParams {
    description?: string
}

export {
    Ingredient,
    IngredientCreate,
    IngredientQueryProps
};