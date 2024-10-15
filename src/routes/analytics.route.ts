import express from "express";
import { protectRoute } from "../middlewares/authenticate.middleware.js";
import { adminRoute } from "../middlewares/authorize.middleware.js";
import { getAnalyticsData, getDailySales } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get('/', protectRoute, adminRoute, async(req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySalesData = await getDailySales(startDate, endDate);


        res.status(200).json({ analyticsData, dailySalesData });
        
    } catch (error) {
        console.log("Error in getAnalyticsData:"+error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;