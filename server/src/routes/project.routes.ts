import { Router } from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectToView,
} from "../controllers/project.controller";
import { jwtCheck } from "../middleware/authMiddleware";
import { upload } from "../config/multer";

const router = Router();

router.get("/", jwtCheck, getProjects);
router.post(
  "/",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createProject
);
router.get("/:id", jwtCheck, getProject);
router.put(
  "/:id",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProject
);
router.delete("/:id", jwtCheck, deleteProject);

router.get("/view/:id", getProjectToView);

export default router;
