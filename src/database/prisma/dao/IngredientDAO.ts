import { IngredientCreate } from "../../../models/Ingredient";
import { prismaClient } from "../PrismaClient";

class IngredientDAO {
    static async create(ingredient: IngredientCreate) {
        return await prismaClient.ingredient.create({ data: ingredient });
    }
}

export { IngredientDAO as dao };