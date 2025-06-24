import { toast } from "sonner";
import axios from "axios";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { updateAccessToken } from "@/features/auth/authSlice";
import { logout } from "@/features/auth/authThunk";
import { refreshAuthToken } from "@/features/auth/authApi";

let store: Store<RootState> | null = null;

export const injectStore = (_store: Store<RootState>) => {
  store = _store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState().auth.accessToken;
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.message === "Token has expired"
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refreshAuthToken();
        store?.dispatch(updateAccessToken(accessToken));

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        console.error("Token refresh failed", refreshError);
        const refreshErrorMessage = refreshError.response?.data?.message || refreshError.message;

        if (refreshErrorMessage === "Invalid refresh token") {
          toast.error("Your session has expired. Please log in again.");
          await store?.dispatch(logout() as unknown as any);
          return null;
        }
      }
    }

    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    if (message !== "Invalid refresh token") toast.error(message);

    return Promise.reject(new Error(message));
  }
);

export default api;