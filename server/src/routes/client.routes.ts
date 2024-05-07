import { Router } from "express";

import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller";
import { jwtCheck } from "../middleware/authMiddleware";

const router = Router();

router.get("/", jwtCheck, getClients);
router.post("/", jwtCheck, createClient);
router.get("/:id", jwtCheck, getClient);
router.put("/:id", jwtCheck, updateClient);
router.delete("/:id", jwtCheck, deleteClient);

export default router;
