import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/log-in/login";
import { signupApi } from "../features/sign-up/signUp";
import { homeApi } from "../features/homepage/home";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(signupApi.middleware)
      .concat(homeApi.middleware),
});
