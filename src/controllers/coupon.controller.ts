import { Request, Response } from "express";
import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.status(200).json(coupon || null);
  } catch (error: Error | any) {
    console.log("Error in getCoupon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Coupon expired" });
    }

    res
      .status(200)
      .json({
        message: "Coupon is valid",
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      });
  } catch (error: Error | any) {
    console.log("Error in validateCoupon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
