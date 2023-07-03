import { IngredientCreate } from "../../../models/Ingredient";
import { validation } from "./validation";
import { z } from "zod";
import { RequestHandler } from "express";

const postValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IngredientCreate>(
        z.object({
            description: z.string().nonempty(),
            value: z.number().gt(0)
        })
    ),
}));

export = {
    postValidation
}

