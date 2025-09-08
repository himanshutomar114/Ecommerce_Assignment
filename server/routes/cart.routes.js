import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);
router.put("/update", protectRoute, updateCartItem);
router.delete("/remove/:itemId", protectRoute, removeCartItem);
router.delete("/clear", protectRoute, clearCart);

export default router;
