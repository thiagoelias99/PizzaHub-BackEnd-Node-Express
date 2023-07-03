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
}

export { IngredientController };