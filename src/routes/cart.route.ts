import express from "express";
import { protectRoute } from "../middlewares/authenticate.middleware.js";
import { addToCart, clearCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts as express.RequestHandler);
router.post("/", protectRoute, addToCart as express.RequestHandler);
router.delete("/", protectRoute, removeAllFromCart as express.RequestHandler);
router.delete("/clear-cart", protectRoute, clearCart as express.RequestHandler);
router.put("/:_id", protectRoute, updateQuantity as express.RequestHandler);

export default router