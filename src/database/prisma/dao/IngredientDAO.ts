import { Prisma } from "@prisma/client";
import { IngredientCreate, IngredientQueryProps } from "../../../models/Ingredient";
import { prismaClient } from "../PrismaClient";

class IngredientDAO {
    static async create(ingredient: IngredientCreate) {
        return await prismaClient.ingredient.create({ data: ingredient });
    }

    static async read(query: IngredientQueryProps) {
        const { description, limit, page } = query;

        console.log(query);

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