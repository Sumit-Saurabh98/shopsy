export interface ICartItem {
    productId: string;
    quantity: number;
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

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}