import mongoose from "mongoose";

interface ICartItem {
	quantity: number;
	productId: string;
}

export interface IUser {
     _id: string;
	name: string;
	email: string;
	password: string;
	cartItems: ICartItem[];
	role: "customer" | "admin";
    comparePassword: (password: string) => Promise<boolean>;
}

 export interface IProduct {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isFeatured: boolean;
}

export interface ICoupon {
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isActive: boolean;
    userId: string;
}