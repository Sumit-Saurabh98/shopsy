import { Request, Response } from "express";
import Order from "../models/order.model.js";
import redis from "../lib/redis.js";
import { IUser } from "../lib/interfaces.js";

export const customerOrders = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)?._id;

  try {

    // check in the redis store
    const customerOrders = await redis.get(`customer_orders_${userId}`);
    if (customerOrders) {
      return res.json({ orders: JSON.parse(customerOrders) });
    }

    const orders = await Order.find({ userId }).populate("products.productId");
    await redis.set(
      `customer_orders_${userId}`,
      JSON.stringify(orders),
      "EX",
      36000
    );

    res.json({ orders });
  } catch (error) {
    console.error("Error in customerOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetch all the orders for the admin

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.json({ orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
