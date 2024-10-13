import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/authenticate.middleware.js";
import { adminRoute } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts as express.RequestHandler);
router.get('/featured', getFeaturedProducts as express.RequestHandler);
router.get('/category/:category', getProductsByCategory as express.RequestHandler);
router.get('/recommendations', getRecommendedProducts as express.RequestHandler);
router.patch('/:_id', protectRoute, adminRoute, toggleFeaturedProduct as express.RequestHandler);
router.post('/', protectRoute, adminRoute, createProduct as express.RequestHandler);
router.delete('/:_id', protectRoute, adminRoute, deleteProduct as express.RequestHandler);

export default router;