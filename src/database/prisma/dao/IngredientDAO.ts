import { Prisma } from "@prisma/client";
import { Ingredient, IngredientCreate, IngredientQueryProps, IngredientUpdate } from "../../../models/Ingredient";
import { prismaClient } from "../PrismaClient";

class IngredientDAO {
    static async create(ingredient: IngredientCreate) {
        return await prismaClient.ingredient.create({
            data: {
                description: ingredient.description,
                unit: ingredient.unit,
                valuePerUnit: ingredient.valuePerUnit,
            }
        });
    }

    static async read(query: IngredientQueryProps) {
        const { description, limit, page } = query;
        return await prismaClient.ingredient.findMany({
            where: {
                description: { contains: description }
            },
            take: limit,
            skip: page ? page - 1 : 0
        });
    }

    static async readById(id: string) {
        return await prismaClient.ingredient.findUnique({
            where: {
                id
            }
        });
    }

    static async update(ingredient: IngredientUpdate) {
        return await prismaClient.ingredient.update({
            where: {
                id: ingredient.id as string
            },
            data: ingredient
        });
    }

    static async destroy(id: string) {
        return await prismaClient.ingredient.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
}

export { IngredientDAO as dao };