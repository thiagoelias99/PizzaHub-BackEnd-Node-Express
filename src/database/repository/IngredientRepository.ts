import { IngredientCreate } from "../../models/Ingredient";

import { dao } from "../prisma/dao/IngredientDAO";

class IngredientRepository {

    static async create(ingredient: IngredientCreate) {
        return await dao.create(ingredient);
    }
}

export { IngredientRepository };