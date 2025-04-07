import { Router } from "express";
import { StudentController } from "./StudentController";

const studentsRoutes = Router();

studentsRoutes.post("/students", StudentController.create);

export default studentsRoutes;