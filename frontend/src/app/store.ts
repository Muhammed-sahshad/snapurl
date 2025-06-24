import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import urlsReducer from "../features/url/urlSlice"
import { injectStore } from "@/lib/axios";

const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlsReducer
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
