import express from "express";
import { login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);
router.post("/refresh-token", protectRoute, refreshAccessToken as express.RequestHandler);
// TODO: add get profile
// router.get("/profile", getProfile as express.RequestHandler);

export default router;