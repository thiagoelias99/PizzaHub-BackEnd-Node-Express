import { IngredientRepository } from "../../database/repository/IngredientRepository";
import { IngredientCreate, IngredientQueryProps, IngredientUpdate } from "../../models/Ingredient";

class IngredientService {

    async createRegister(ingredient: IngredientCreate) {
        return await IngredientRepository.create(ingredient);
    }

    async getAll(query: IngredientQueryProps) {
        return await IngredientRepository.read(query);
    }

    async getById(id: string) {
        return await IngredientRepository.readById(id);
    }

    async update(id: string, ingredient: IngredientUpdate) {
        return await IngredientRepository.update({ ...ingredient, id });
    }

    async destroy(id: string) {
        return await IngredientRepository.destroy(id);
    }
}

export { IngredientService };