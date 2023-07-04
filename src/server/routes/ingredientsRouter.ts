import { Router } from "express";
import { IngredientController } from "../controllers/IngredientController";

const router = Router();
import { paramsValidation } from "../middlewares/validation/IngredientValidation";

const path = "/ingredients";

router.route(path)
    .post(IngredientController.post)
    .get(IngredientController.getAll);

router.route(`${path}/:id`)
    .all(paramsValidation)
    .get(IngredientController.getById)
    .put(IngredientController.put)
    .delete(IngredientController.del);

export { router };