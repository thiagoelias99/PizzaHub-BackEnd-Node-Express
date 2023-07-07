import { IPizza, IPizzaCreate, IPizzaDetails, IPizzaQueryProps } from "../../../models/Pizza";
import { prismaClient } from "../PrismaClient";

class PizzaDAO {
    static async create(pizza: IPizzaCreate) {
        const createdPizza = await prismaClient.pizza.create({
            data: {
                description: pizza.description,
                sellingPrice: pizza.sellingPrice
            }
        });

        await prismaClient.pizzasXIngredients.deleteMany({ where: { pizzaId: createdPizza.id } });
        pizza.ingredients?.forEach(async ingredient => {
            await prismaClient.pizzasXIngredients.create({
                data: {
                    pizzaId: createdPizza.id,
                    ingredientId: ingredient.id,
                    ingredientQuantity: ingredient.ingredient_quantity
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
        const pizzaFromDB = await prismaClient.pizza.findUnique({
            where: {
                id
            }
        });

        const ingredientsFromPizza = await prismaClient.pizzasXIngredients.findMany({
            where: {
                pizzaId: id
            }
        })
            .then(data => {
                return data.map(async ingredient => {
                    const data = await prismaClient.ingredient.findUnique({
                        where: {
                            id: ingredient.ingredientId
                        }
                    });
                    const ingredientQuantity = ingredient.ingredientQuantity;
                    if (data) {
                        return { ...data, ingredientQuantity };
                    }
                });
            });

        const ingredients = await Promise.all(ingredientsFromPizza);
        // .then(data => {
        // });
        console.log(ingredients);

        const pizzaWithIngredients: IPizzaDetails = {
            id: id,
            description: pizzaFromDB?.description || "",
            sellingPrice: Number(pizzaFromDB?.sellingPrice) || 0,
            ingredients: ingredients.map(ingredient => {
                return {
                    id: ingredient?.id,
                    description: ingredient?.description,
                    unit: ingredient?.unit,
                    valuePerUnit: Number(ingredient?.valuePerUnit),
                    ingredient_quantity: Number(ingredient?.ingredientQuantity)
                };
            })
            // ingredients: ingredientsFromPizza
            // ingredients: ingredientsFromPizza.map(ingredient => {
            // return {
            //     id: ingredient.ingredientId,
            //     ingredient_quantity: Number(ingredient.ingredientQuantity)
            // };
            // })
        };

        return pizzaWithIngredients;
    }

    static async update(pizza: IPizza) {
        await prismaClient.pizza.update({
            where: {
                id: pizza.id as string
            },
            data: {
                description: pizza.description,
                sellingPrice: pizza.sellingPrice
            }
        });

        await prismaClient.pizzasXIngredients.deleteMany({ where: { pizzaId: pizza.id } });
        pizza.ingredients?.forEach(async ingredient => {
            await prismaClient.pizzasXIngredients.create({
                data: {
                    pizzaId: pizza.id,
                    ingredientId: ingredient.id,
                    ingredientQuantity: ingredient.ingredient_quantity
                }
            });
        });

        return this.readById(pizza.id);
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