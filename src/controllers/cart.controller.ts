import { Request, Response } from "express";
import { IUser } from "../lib/interfaces";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = (req.user as IUser)?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      user.cartItems[existingItemIndex].quantity += 1;
    } else {
      user.cartItems.push({ productId, quantity: 1 });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Product added to cart", cartItems: user.cartItems });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartProducts = async (req: Request, res: Response) => {
    try {
        // const products = await Product.find({ _id: { $in: req.user?.cartItems } });
        const products = await Product.find({_id: { $in: req.user?.cartItems.map(item => item.productId) } });

        // add quantity property to each product
        const cartItems = products.map((product) => {
            const item = req.user?.cartItems.find(
                (cartItem) => cartItem.productId.toString() === product.id.toString()
            )

            return {
                ...product.toJSON(),
                quantity: item?.quantity
            }
        })
        res.status(200).json({ cartItems });
    } catch (error) {
        console.log("Error in getCartProducts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const removeAllFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = (req.user as IUser)?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res
      .status(200)
      .json({
        message: "Product removed from cart",
        cartItems: user.cartItems,
      });
  } catch (error) {
    console.error("Error in removeAllFromCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartItems = [];

    await user.save();

    res
      .status(200)
      .json({
        message: "Product cleared from cart",
        cartItems: user.cartItems,
      });
  } catch (error) {
    console.error("Error in clearCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateQuantity = async (req: Request, res: Response) => {
  try {
    const { _id: productId } = req.params;
    const { quantity } = req.body;
    const userId = (req.user as IUser)._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user?.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.productId.toString() !== productId
        );
        await user.save();
        return res
          .status(200)
          .json({
            message: "Product removed from cart",
            cartItems: user.cartItems,
          });
      }
      existingItem.quantity = quantity;
      await user.save();
      return res
        .status(200)
        .json({
          message: "Product quantity updated",
          cartItems: user.cartItems,
        });
    }else{
      return res.status(404).json({ message: "Product not found" });
    }

  } catch (error) {
    console.error("Error in updateQuantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
