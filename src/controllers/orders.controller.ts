import { Request, Response } from "express";
import Order from "../models/order.model.js";
import { IUser } from "../lib/interfaces.js";

export const customerOrders = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)?._id;

  try {

    // Fetch orders and populate product details
    const orders = await Order.find({ userId })
      .populate({
        path: 'products.productId',
        model: 'Product' 
      });

    res.json({ orders });
  } catch (error) {
    console.error("Error in customerOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

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