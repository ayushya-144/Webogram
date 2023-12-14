import { configureStore } from "@reduxjs/toolkit";
import { loginSignupApi } from "../features/login-signup/loginSignupApi";
import { homeApi } from "../features/homepage/home";
import { profileApi } from "../features/profile/profile";

export const store = configureStore({
  reducer: {
    [loginSignupApi.reducerPath]: loginSignupApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginSignupApi.middleware)
      .concat(homeApi.middleware)
      .concat(profileApi.middleware),
});
