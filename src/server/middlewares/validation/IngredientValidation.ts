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

export {
    bodyValidation,
    paramsValidation
};

