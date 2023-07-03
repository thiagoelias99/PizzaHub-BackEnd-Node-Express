import { IngredientRepository } from "../../database/repository/IngredientRepository";
import { IngredientCreate } from "../../models/Ingredient";

class IngredientService {

    async createRegister(ingredient: IngredientCreate) {
        return await IngredientRepository.create(ingredient);
    }
}

export { IngredientService };