import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "login.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
