import { configureStore } from "@reduxjs/toolkit";
import { loginSignupApi } from "../features/login-signUp/loginSignUpApi";
import { homeApi } from "../features/homepage/home";
import { profileApi } from "../features/profile/profile";
import { chatsApi } from "../features/chats/chats";

export const store = configureStore({
  reducer: {
    [loginSignupApi.reducerPath]: loginSignupApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginSignupApi.middleware)
      .concat(homeApi.middleware)
      .concat(profileApi.middleware)
      .concat(chatsApi.middleware),
});
