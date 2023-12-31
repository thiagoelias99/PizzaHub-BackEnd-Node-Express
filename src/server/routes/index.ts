import express from "express";

import { router as IngredientsRouter } from "./ingredientsRouter";
import { router as PizzaRouter } from "./PizzaRouter";
// const StudentsRouter = require("./studentsRouter")
// const CoursesRouter = require("./coursesRouter")
// const WelcomeRoute = require("./welcome")
// const Route404 = require("./404")

const router = express.Router();

router.use(IngredientsRouter);
router.use(PizzaRouter);

// router.use(WelcomeRoute);
// router.use(StudentsRouter);
// router.use(CoursesRouter);

// router.use(Route404);

export { router };