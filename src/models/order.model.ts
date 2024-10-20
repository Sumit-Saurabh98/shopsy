import mongoose from "mongoose";
import { IOrder } from "../lib/interfaces.js";


const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		stripeSessionId: {
			type: String,
			unique: true,
		},
		orderStatus: {
			type: String,
			enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
			default: "pending",
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;