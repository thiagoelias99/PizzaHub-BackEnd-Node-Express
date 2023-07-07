import { IIngredientsForPizza, IngredientUpdate } from "./Ingredient";
import { IQueryParams } from "./QueryParams";

interface IPizza {
    id: string,
    description: string,
    sellingPrice: number,
    ingredients?: {
        id: string,
        ingredient_quantity: number
    }[]
}

interface IPizzaCreate extends Omit<IPizza, "id"> { }

interface IPizzaQueryProps extends IQueryParams {
    description?: string
}

interface IPizzaDetails extends Omit<IPizza, "ingredients"> {
    ingredients?: {
        id?: string,
        description?: string,
        unit?: string,
        valuePerUnit?: number,
        ingredient_quantity?: number
    }[]
}
// interface IPizzaDetails extends Omit<IPizza, "ingredients"> {
//     ingredients?: IIngredientsForPizza
// }

export {
    IPizza,
    IPizzaCreate,
    IPizzaQueryProps,
    IPizzaDetails
};