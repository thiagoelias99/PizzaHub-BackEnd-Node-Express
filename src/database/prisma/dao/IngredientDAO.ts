import { Prisma } from "@prisma/client";
import { IngredientCreate } from "../../../models/Ingredient";
import { prismaClient } from "../PrismaClient";

class IngredientDAO {
    static async create(ingredient: IngredientCreate) {
        return await prismaClient.ingredient.create({ data: ingredient });
    }

    static async read() {
        return await prismaClient.ingredient.findMany();
    }

    static async readById(id: string) {
        return await prismaClient.ingredient.findUnique({
            where: {
                id
            }
        });
    }

    static async update(ingredient: Prisma.IngredientUpdateInput) {
        return await prismaClient.ingredient.update({
            where: {
                id: ingredient.id as string
            },
            data: {
                ...ingredient
            }
        });
    }

    static async destroy(id: string) {
        return await prismaClient.ingredient.delete({
            where: {
                id
            }
        });
    }
}

export { IngredientDAO as dao };