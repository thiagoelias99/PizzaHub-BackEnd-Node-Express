import { Router } from "express";
import { IngredientController } from "../controllers/IngredientController";

const router = Router();
// const { RequestValidator, Authentication, AdminAuthentication } = require("../middlewares");
// const { CourseController } = require("../controllers");


const path = "/ingredients";

router.route(path)
    .post(IngredientController.post);
// .get(AdminAuthentication, CourseController.get);

// router.route(`${path}/info`)
//     .get(Authentication, CourseController.getInfo)

// router.route(`${path}/:uuid`)
//     .all(RequestValidator.params)
//     .get(AdminAuthentication, CourseController.getByUuid)
//     .put(AdminAuthentication, RequestValidator.body, CourseController.put)
//     .delete(AdminAuthentication, CourseController.del);

// router.route(`${path}/:uuid/subscribe`)
//     .patch(Authentication, RequestValidator.params, CourseController.subscribe);

// router.route(`${path}/:uuid/unsubscribe`)
//     .patch(Authentication, RequestValidator.params, CourseController.unsubscribe);

export { router };