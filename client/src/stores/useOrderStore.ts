import {create} from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { IOrder} from "../lib/interfaces";

interface IOrderStore{
    customerOrder: IOrder[],
    allOrder: IOrder[],
    loadingCustomerOrder: boolean,
    loadingAllOrder: boolean,
    loadingOrderStatus: boolean,
    fetchCustomerOrder: () => Promise<void>
    fetchAllOrder: () => Promise<void>
    orderStatusChanged: (orderId: string, newStatus: string) => Promise<void>
}

export const useOrderStore = create<IOrderStore>((set) => ({
    customerOrder: [],
    allOrder: [],
    loadingCustomerOrder: false,
    loadingAllOrder: false,
    loadingOrderStatus: false,

    fetchCustomerOrder: async () => {
        set({ loadingCustomerOrder: true });
        try {
            const res = await axiosInstance.get("/orders/customer-orders");
            set({ customerOrder: res.data.orders });
            set({ loadingCustomerOrder: false });
        } catch (error: unknown) {
            console.error(error);
            set({ loadingCustomerOrder: false });
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            toast.error(axiosError.response?.data?.message || "Something went wrong");
        }finally{
            set({ loadingCustomerOrder: false });
        }
    },

    fetchAllOrder: async () => {
        set({ loadingAllOrder: true });
        try {
            const res = await axiosInstance.get("/orders");
            set({ allOrder: res.data.orders });
            set({ loadingAllOrder: false });
        } catch (error: unknown) {
            console.error(error);
            set({ loadingAllOrder: false });
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            toast.error(axiosError.response?.data?.message || "Something went wrong");
        }finally{
            set({ loadingAllOrder: false });
        }
    },

    orderStatusChanged: async (orderId, newStatus) =>{
        set({loadingOrderStatus: true})

        try {
            const res = await axiosInstance.patch('orders/update-status', {
          orderId: orderId,
          orderStatus: newStatus
        });

        if (res.status === 200) {
        toast.success("Order status updated successfully!");
      }

        } catch (error: unknown) {
            console.error(error);
            set({ loadingAllOrder: false });
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            toast.error(axiosError.response?.data?.message || "Something went wrong");
        }finally{
            set({ loadingAllOrder: false });
        }
    }
}))