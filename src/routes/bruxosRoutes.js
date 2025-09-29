import express from "express";
import { getAllBruxos, getBruxosById, createBruxo, updateBruxo, deleteBruxo } from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);
router.post("/", createBruxo);
router.put("/:id", updateBruxo);
router.delete("/:id", deleteBruxo);

export default router;