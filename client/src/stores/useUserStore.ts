import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";
import { IUser } from "../lib/interfaces";

export interface IUserStore {
  user: IUser | null;
  signUpLoading: boolean;
  loginLoading: boolean;
  checkAuthLoading: boolean;
  checkingAuth: boolean;

  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  user: null,
  signUpLoading: false,
  loginLoading: false,
  checkAuthLoading: false,
  checkingAuth: true,

  signup: async (name, email, password, confirmPassword) => {
    set({ signUpLoading: true });

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ signUpLoading: false });
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, signUpLoading: false, checkingAuth: false });

      toast.success("Account created successfully");
    } catch (error: unknown) {
      console.error(error);
      set({ signUpLoading: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ signUpLoading: false });
    }
  },

  login: async (email, password) => {
    set({ loginLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, loginLoading: false, checkingAuth: false });

      toast.success("Logged in successfully");
    } catch (error: unknown) {
      console.error(error);
      set({ loginLoading: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error: unknown) {
      console.error(error);
      set({ loginLoading: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, checkAuthLoading: true });
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({
        user: res.data.user,
        checkingAuth: false,
        checkAuthLoading: false,
      });
    } catch (error: unknown) {
      console.error(error);
      set({ user: null, checkingAuth: false, checkAuthLoading: false });
    } finally {
      set({ checkAuthLoading: false });
    }
  },

  refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axiosInstance.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));


let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axiosInstance(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);