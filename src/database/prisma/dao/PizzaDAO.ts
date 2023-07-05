import { Prisma } from "@prisma/client";
import { IPizza, IPizzaCreate, IPizzaQueryProps } from "../../../models/Pizza";
import { prismaClient } from "../PrismaClient";

class PizzaDAO {
    static async create(pizza: IPizzaCreate) {
        const createdPizza = await prismaClient.pizza.create({
            data: {
                description: pizza.description,
                value: pizza.value,
            }
        });

        await prismaClient.pizzasXIngredients.deleteMany({ where: { pizzaId: createdPizza.id } });
        pizza.ingredients?.forEach(async ingredient => {
            await prismaClient.pizzasXIngredients.create({
                data: {
                    pizzaId: createdPizza.id,
                    ingredientId: ingredient.id
                }
            });
        });




        return createdPizza;
    }

    static async read(query: IPizzaQueryProps) {
        const { description, limit, page } = query;
        return await prismaClient.pizza.findMany({
            where: {
                description: { contains: description }
            },
            take: limit,
            skip: page ? page - 1 : 0
        });
    }

    static async readById(id: string) {
        return await prismaClient.pizza.findUnique({
            where: {
                id
            }
        });
    }

    static async update(pizza: IPizza) {
        return await prismaClient.pizza.update({
            where: {
                id: pizza.id as string
            },
            data: {
                description: pizza.description,
                value: pizza.value
            }
        });
    }

    static async destroy(id: string) {
        return await prismaClient.pizza.delete({
            where: {
                id
            }
        });
    }
}

export { PizzaDAO as dao };