import { IngredientCreate } from "../../../models/Ingredient";
import { validation } from "./validation";
import { ZodError, z } from "zod";
import { RequestHandler } from "express";
import { ParamsError } from "../../../errors";

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

    try {
        const result = schema.parse(data);
        return result;
    } catch (error) {
        if (error instanceof ZodError) {
            const paramsError = new ParamsError();
            error.issues.forEach(err => {
                paramsError.addToErrorList(err.path.toString(), err.message);
            });
            throw paramsError;
        }
        throw error;
    }



}

export {
    bodyValidation,
    paramsValidation,
    queryValidation
};

