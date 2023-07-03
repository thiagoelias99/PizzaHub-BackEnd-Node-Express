interface Ingredient {
    id?: string,
    description: string,
    value: number
}

interface IngredientCreate {
    description: string,
    value: number
}

export {
    Ingredient,
    IngredientCreate
};