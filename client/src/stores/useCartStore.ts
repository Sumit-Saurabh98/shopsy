import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { IProduct } from "../lib/interfaces";
import { ICoupon } from "../lib/interfaces";


export interface ICartStore {
    cart: IProduct[];
    coupon: ICoupon | null;
    total: number;
    subtotal: number;
    getCartItems: () => Promise<void>;
    addToCart: (product: IProduct) => Promise<void>;
    calculateTotals: () => void;
}

export const useCartStore = create<ICartStore>((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data.cartItems });
      get().calculateTotals();
    } catch (error: unknown) {
      set({ cart: [] });
      console.error(error);
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  addToCart: async (product: IProduct) => {
    try {
      await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart", { id: "success" });

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity! + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1}];

        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error: unknown) {
      set({ cart: [] });
      console.error(error);
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  calculateTotals: () => {
    const {cart, coupon} = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity!, 0);
    const discount = coupon ? subtotal * coupon.discountPercentage/100 : 0;
    const total = subtotal - discount; 

    set({subtotal, total});
  }
}));
