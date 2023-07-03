import { IngredientCreate, IngredientQueryProps } from "../../../models/Ingredient";
import { validation } from "./validation";
import { z } from "zod";
import { RequestHandler } from "express";

const bodyValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IngredientCreate>(
        z.object({
            description: z.string().nonempty(),
            value: z.number().gt(0)
        })
    ),
}));

const paramsValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<{ id: string }>(
        z.object({
            id: z.string().uuid()
        })
    ),
}));

const queryValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<Partial<IngredientQueryProps>>(
        z.object({
            page: z.number().gt(0).default(1).optional(),
            limit: z.number().gt(0).default(10).optional(),
            description: z.string().nonempty().default("").optional()
        })
    ),
}));

export {
    bodyValidation,
    paramsValidation,
    queryValidation
};

