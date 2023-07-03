import { Router } from "express";
import { IngredientController } from "../controllers/IngredientController";

const router = Router();
// const { RequestValidator, Authentication, AdminAuthentication } = require("../middlewares");
// const { CourseController } = require("../controllers");
import { bodyValidation, paramsValidation, queryValidation } from "../middlewares/validation/IngredientValidation";


const path = "/ingredients";

router.route(path)
    .post(bodyValidation, IngredientController.post)
    .get(queryValidation, IngredientController.getAll);

router.route(`${path}/:id`)
    .all(paramsValidation)
    .get(IngredientController.getById)
    .put(bodyValidation, IngredientController.put)
    .delete(IngredientController.del);

// router.route(`${path}/:uuid/subscribe`)
//     .patch(Authentication, RequestValidator.params, CourseController.subscribe);

// router.route(`${path}/:uuid/unsubscribe`)
//     .patch(Authentication, RequestValidator.params, CourseController.unsubscribe);

export { router };