import { Prisma } from "@prisma/client";
import { IPizzaCreate, IPizzaQueryProps } from "../../../models/Pizza";
import { prismaClient } from "../PrismaClient";

class PizzaDAO {
    static async create(pizza: IPizzaCreate) {
        return await prismaClient.pizza.create({ data: pizza });
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

    static async update(pizza: Prisma.PizzaUpdateInput) {
        return await prismaClient.pizza.update({
            where: {
                id: pizza.id as string
            },
            data: {
                ...pizza
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