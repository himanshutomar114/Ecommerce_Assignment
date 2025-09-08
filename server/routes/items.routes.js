import express from "express";
import { protectRoute, adminOnly } from "../middleware/auth.middleware.js";
import { getItems, createItem, updateItem, deleteItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems); // anyone can see
router.post("/", protectRoute, adminOnly, createItem);
router.put("/:id", protectRoute, adminOnly, updateItem);
router.delete("/:id", protectRoute, adminOnly, deleteItem);

export default router;
