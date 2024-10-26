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
    isCouponApplied: boolean;
    getCartItems: () => Promise<void>;
    addToCart: (product: IProduct) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    getMyCoupon: () => Promise<void>;   
    applyCoupon: (code : string) => Promise<void>;
    clearCart: () => void;
    removeCoupon: () => void;    
    calculateTotals: () => void;
}

export const useCartStore = create<ICartStore>((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

   getMyCoupon: async () => {
		try {
			const response = await axiosInstance.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
   applyCoupon: async (code) => {
		try {
			const response = await axiosInstance.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error:unknown) {
			console.error(error);
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Failed to apply coupon");
		}
	},
  removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

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

  clearCart: async () => {
        try {
            await axiosInstance.delete(`/cart/clear-cart`);
            set({ cart: [], coupon: null, total: 0, subtotal: 0 });
        } catch (error) {
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

  removeFromCart: async (productId) => {
		try {
            await axiosInstance.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
        } catch (error) {
            console.error(error);
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            toast.error(axiosError.response?.data?.message || "Something went wrong");
        }
	},

    updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axiosInstance.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},

  calculateTotals: () => {
    const {cart, coupon} = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity!, 0);
    const discount = coupon ? subtotal * coupon.discountPercentage/100 : 0;
    const total = subtotal - discount; 

    set({subtotal, total});
  }
}));
