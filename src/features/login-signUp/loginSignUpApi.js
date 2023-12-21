import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginSignupApi = createApi({
  reducerPath: "loginSignup.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1/auth",
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSignUpUserMutation } = loginSignupApi;
