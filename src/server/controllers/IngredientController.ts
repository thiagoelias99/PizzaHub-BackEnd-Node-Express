import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { IngredientService } from "../services/IngredientService";
import { IngredientCreate } from "../../models/Ingredient";
const ingredientService = new IngredientService();

class IngredientController {
    static async post(req: Request<{}, IngredientCreate>, res: Response, next: NextFunction) {
        try {
            const ingredient = await ingredientService.createRegister(req.body);
            if (ingredient) {
                res.status(StatusCodes.CREATED).json({ id: ingredient.id });
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const ingredients = await ingredientService.getAll();
            if (ingredients) {
                res.status(StatusCodes.OK).json(ingredients);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const ingredient = await ingredientService.getById(req.params.id);
            if (ingredient) {
                res.status(StatusCodes.OK).json(ingredient);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async put(req: Request<{ id: string }, {}, IngredientCreate>, res: Response, next: NextFunction) {
        try {
            const ingredient = await ingredientService.update(req.params.id, req.body);
            if (ingredient) {
                res.status(StatusCodes.OK).json(ingredient);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async del(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const response = await ingredientService.destroy(req.params.id);
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