import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

import { IngredientService } from "../services/IngredientService";
import { IngredientCreate, IngredientQueryProps } from "../../models/Ingredient";
const ingredientService = new IngredientService();

class IngredientController {
    static async post(req: Request<{}, {}, IngredientCreate>, res: Response, next: NextFunction) {
        const { description, value } = req.body;
        const ingredient: IngredientCreate = {
            description,
            value
        };
        try {
            const result = await ingredientService.createRegister(ingredient);
            if (result) {
                res.status(StatusCodes.CREATED).json({ id: result.id });
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request<{}, {}, {}, IngredientQueryProps>, res: Response, next: NextFunction) {
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
            const validatedData: IngredientQueryProps = schema.parse(req.query);
            const ingredients = await ingredientService.getAll(validatedData);
            if (ingredients) {
                res.status(StatusCodes.OK).json(ingredients);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error.format());
            }
            next(error);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const result = await ingredientService.getById(id);
            if (result) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async put(req: Request<{ id: string }, {}, IngredientCreate>, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { description, value } = req.body;
        const ingredient: IngredientCreate = {
            description,
            value
        };
        try {
            const result = await ingredientService.update(id, ingredient);
            if (result) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async del(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await ingredientService.destroy(id);
            if (response) {
                res.sendStatus(StatusCodes.OK);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }
}

export {
    IngredientController
};