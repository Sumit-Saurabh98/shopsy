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

    const orders = await Order.find({ userId }).populate({
      path: 'products.productId',
      model: 'Product',
      select: 'name price description image category'
    });
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
    const orders = await Order.find().populate("userId", "name email");
    res.json({ orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update order status

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, orderStatus } = req.body;
    if (!orderId || !orderStatus) {
      return res
        .status(404)
        .json({ message: "orderId or orderStatus is required" });
    }

    // update the order status in the redis before updating in db
    const order = await Order.findOne({ _id: orderId });
    const userId = order?.userId;
    const orderInRedis = await redis.get(`customer_orders_${userId}`);
    if (orderInRedis) {
      const orders: { _id: string; orderStatus?: string }[] =
        JSON.parse(orderInRedis);
      const updatedOrders = orders.map((o) =>
        o._id.toString() === orderId ? { ...o, orderStatus } : o
      );
      await redis.set(
        `customer_orders_${userId}`,
        JSON.stringify(updatedOrders),
        "EX",
        36000
      );
    }
    

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.json({ order: updatedOrder });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
