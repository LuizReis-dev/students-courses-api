import { Router } from "express";
import studentsRoutes from "./students/routes";

const router = Router();
router.use(studentsRoutes);

export default router;