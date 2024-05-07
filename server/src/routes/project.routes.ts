import { Router } from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,  
} from "../controllers/project.controller";
import { jwtCheck } from "../middleware/authMiddleware";

const router = Router();

router.get("/", jwtCheck, getProjects);
router.post("/", jwtCheck, createProject);
router.get("/:id", jwtCheck, getProject);
router.put("/:id", jwtCheck, updateProject);
router.delete("/:id", jwtCheck, deleteProject);


export default router;
