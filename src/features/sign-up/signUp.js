import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signupApi = createApi({
  reducerPath: "signup.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSignUpUserMutation } = signupApi;
