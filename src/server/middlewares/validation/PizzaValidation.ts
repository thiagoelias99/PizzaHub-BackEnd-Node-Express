import { IPizzaCreate } from "../../../models/Pizza";
import { validation } from "./validation";
import { z } from "zod";
import { RequestHandler } from "express";
import { validate } from "./validationWithResult";

function bodyValidation(data: any): IPizzaCreate {
    const schema = z.object({
        description: z.string().nonempty(),
        value: z.number().gt(0),
        ingredients:
            z.object({
                id: z.string().uuid(),
                ingredient_quantity: z.number().gt(0)
            }).array().optional()

    });

    // console.log(schema.parse(data));

    return validate(schema, data);
}

const paramsValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<{ id: string }>(
        z.object({
            id: z.string().uuid()
        })
    ),
}));

function queryValidation(data: any) {
    const schema = z.object({
        page: z.string()
            .transform((value, error) => {
                const parsed = Number(value);
                if (isNaN(parsed)) {
                    error.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Not a number",
                    });
                    return z.NEVER;
                }
                return parsed;
            })
            .refine(number => number > 0, { message: "Number must be greater than zero." })
            .optional()
            .default("1"),
        limit: z.string()
            .transform((value, error) => {
                const parsed = Number(value);
                if (isNaN(parsed)) {
                    error.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Not a number",
                    });
                    return z.NEVER;
                }
                return parsed;
            })
            .refine(number => number > 0, { message: "Number must be greater than zero." })
            .optional()
            .default("10"),
        description: z.string().nonempty().default("").optional()
    });

    return validate(schema, data);
}

export {
    bodyValidation,
    paramsValidation,
    queryValidation
};

