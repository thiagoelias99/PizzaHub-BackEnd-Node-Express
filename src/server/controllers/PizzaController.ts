import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyValidation, queryValidation } from "../middlewares/validation/PizzaValidation";

import { PizzaService } from "../services/PizzaService";
import { IPizzaCreate, IPizzaQueryProps } from "../../models/Pizza";
const pizzaService = new PizzaService();

class PizzaController {
    static async post(req: Request<{}, {}, IPizzaCreate>, res: Response, next: NextFunction) {
        try {
            const validatedData: IPizzaCreate = bodyValidation(req.body);
            const result = await pizzaService.createRegister(validatedData);
            res.status(StatusCodes.CREATED).json({ id: result?.id });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request<{}, {}, {}, IPizzaQueryProps>, res: Response, next: NextFunction) {
        try {
            const validatedData: IPizzaQueryProps = queryValidation(req.query);
            const pizzas = await pizzaService.getAll(validatedData);
            res.status(StatusCodes.OK).json(pizzas);

        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const result = await pizzaService.getById(id);
            if (result) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            next(error);
        }
    }

    static async put(req: Request<{ id: string }, {}, IPizzaCreate>, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { description, value } = req.body;
        const pizza: IPizzaCreate = {
            description,
            value
        };
        try {
            const validatedData: IPizzaCreate = bodyValidation(pizza);
            const result = await pizzaService.update(id, validatedData);
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
            const response = await pizzaService.destroy(id);
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
    PizzaController
};