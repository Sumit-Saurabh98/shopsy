import {create} from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { IOrder} from "../lib/interfaces";

interface IOrderStore{
    customerOrder: IOrder[],
    loading: boolean,
    fetchCustomerOrder: () => Promise<void>
}

export const useOrderStore = create<IOrderStore>((set) => ({
    customerOrder: [],
    loading: false,

    fetchCustomerOrder: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/orders/customer-orders");
            set({ customerOrder: res.data.orders });
            set({ loading: false });
        } catch (error: unknown) {
            console.error(error);
            set({ loading: false });
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            toast.error(axiosError.response?.data?.message || "Something went wrong");
        }finally{
            set({ loading: false });
        }
    }
}))