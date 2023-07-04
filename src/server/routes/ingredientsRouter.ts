import { Router } from "express";
import { IngredientController } from "../controllers/IngredientController";

const router = Router();
import { bodyValidation, paramsValidation } from "../middlewares/validation/IngredientValidation";

const path = "/ingredients";

router.route(path)
    .post(bodyValidation, IngredientController.post)
    .get(IngredientController.getAll);

router.route(`${path}/:id`)
    .all(paramsValidation)
    .get(IngredientController.getById)
    .put(bodyValidation, IngredientController.put)
    .delete(IngredientController.del);

export { router };