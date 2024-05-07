import { Router } from "express";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";
import { jwtCheck } from "../middleware/authMiddleware";

const router = Router();

router.get("/", jwtCheck, getComments);
router.post("/", jwtCheck, createComment);
router.put("/:id", jwtCheck, updateComment);
router.delete("/:id", jwtCheck, deleteComment);

export default router;
