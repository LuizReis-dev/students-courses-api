import { Router } from "express";
import { StudentController } from "./StudentController";

const studentsRoutes = Router();

studentsRoutes.get("/students", StudentController.getAll);
studentsRoutes.get("/students/:id", StudentController.getById);
studentsRoutes.post("/students", StudentController.create);
studentsRoutes.put("/students/:id", StudentController.update);
studentsRoutes.delete("/students/:id", StudentController.delete);

export default studentsRoutes;