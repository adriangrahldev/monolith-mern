import { Router } from "express";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { jwtCheck } from "../middleware/authMiddleware";
import { upload } from "../config/multer";

const router = Router();

router.get("/", jwtCheck, getTasks);
router.get("/:id", jwtCheck, getTask);
router.post(
  "/",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createTask
);
router.put(
  "/:id",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateTask
);
router.delete("/:id", jwtCheck, deleteTask);

export default router;
