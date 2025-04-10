import { Router } from "express";
import { CourseController } from "./CourseController";

const coursesRoutes = Router();

coursesRoutes.get("/courses", CourseController.getAll);
coursesRoutes.get("/courses/:id", CourseController.getById);
coursesRoutes.post("/courses", CourseController.create);
coursesRoutes.put("/courses/:id", CourseController.update);
coursesRoutes.patch("/courses/:id", CourseController.patch);
coursesRoutes.delete("/courses/:id", CourseController.delete);

export default coursesRoutes;