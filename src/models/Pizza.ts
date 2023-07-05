import { IQueryParams } from "./QueryParams";

interface IPizza {
    id: string,
    description: string,
    value: number,
    ingredients?: {
        id: string,
        ingredient_quantity: string
    }[]
}

interface IPizzaCreate extends Omit<IPizza, "id"> {}

interface IPizzaQueryProps extends IQueryParams {
    description?: string
}

export {
    IPizza,
    IPizzaCreate,
    IPizzaQueryProps
};