import { Router } from "express";
import studentsRoutes from "./students/routes";
import coursesRoutes from "./courses/routes";

const router = Router();
router.use(studentsRoutes);
router.use(coursesRoutes);

export default router;