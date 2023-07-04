import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { bodyValidation, queryValidation } from "../middlewares/validation/IngredientValidation";

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
            const validatedData: IngredientCreate = bodyValidation(ingredient);
            const result = await ingredientService.createRegister(validatedData);
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
        try {
            const validatedData: IngredientQueryProps = queryValidation(req.query);
            const ingredients = await ingredientService.getAll(validatedData);
            res.status(StatusCodes.OK).json(ingredients);
            
        } catch (error) {
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
            const validatedData: IngredientCreate = bodyValidation(ingredient);
            const result = await ingredientService.update(id, validatedData);
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