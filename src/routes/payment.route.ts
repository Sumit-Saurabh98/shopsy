import express from "express";
import { protectRoute } from "../middlewares/authenticate.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession as express.RequestHandler);
router.post("/checkout-success", protectRoute, checkoutSuccess as express.RequestHandler);

export default router;