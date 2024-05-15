import { Router } from "express";

import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller";
import { jwtCheck } from "../middleware/authMiddleware";
import { upload } from "../config/multer";

const router = Router();

router.get("/", jwtCheck, getClients);
router.post(
  "/",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createClient
);
router.get("/:id", jwtCheck, getClient);
router.put(
  "/:id",
  jwtCheck,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateClient
);
router.delete("/:id", jwtCheck, deleteClient);

export default router;
