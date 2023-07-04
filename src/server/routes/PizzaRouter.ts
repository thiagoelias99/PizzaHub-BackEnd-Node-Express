import { Router } from "express";
import { PizzaController } from "../controllers/PizzaController";

const router = Router();
import { paramsValidation } from "../middlewares/validation/PizzaValidation";

const path = "/pizzas";

router.route(path)
    .post(PizzaController.post)
    .get(PizzaController.getAll);

router.route(`${path}/:id`)
    .all(paramsValidation)
    .get(PizzaController.getById)
    .put(PizzaController.put)
    .delete(PizzaController.del);

export { router };