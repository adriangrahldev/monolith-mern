import { Router } from "express";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,  
} from "../controllers/task.controller";
import { jwtCheck } from "../middleware/authMiddleware";

const router = Router();

router.get("/", jwtCheck, getTasks);
router.get("/:id", jwtCheck, getTask);
router.post("/", jwtCheck, createTask);
router.put("/:id", jwtCheck, updateTask);
router.delete("/:id", jwtCheck, deleteTask);


export default router;
