import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/log-in/login";
import { signupApi } from "../features/sign-up/signUp";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(signupApi.middleware),
});
