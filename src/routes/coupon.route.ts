import express from "express";
import { protectRoute } from "../middlewares/authenticate.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get('/', protectRoute, getCoupon);
router.post('/validate', protectRoute, validateCoupon as express.RequestHandler);

export default router