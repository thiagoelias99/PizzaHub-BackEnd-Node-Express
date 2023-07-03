import { Ingredient, IngredientCreate } from "../../models/Ingredient";

import { dao } from "../prisma/dao/IngredientDAO";

class IngredientRepository {

    static async create(ingredient: IngredientCreate) {
        return await dao.create(ingredient);
    }

    static async read() {
        return await dao.read();
    }

    static async readById(id: string) {
        return await dao.readById(id);
    }

    static async update(ingredient: Ingredient) {
        return await dao.update(ingredient);
    }

    static async destroy(id: string) {
        return await dao.destroy(id);
    }
}

export { IngredientRepository };