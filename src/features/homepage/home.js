import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";

export const homeApi = createApi({
  reducerPath: "home.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getUserPosts: builder.query({
      query: (token) => ({
        url: "/posts/get-feed-post",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["Posts"],
    }),
    createUserPosts: builder.mutation({
      query: (posts) => ({
        url: "/posts/create-post",
        method: "POST",
        body: posts,
        headers: {
          Authorization: getUserToken(),
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    searchPosts: builder.query({
      query: (searchTxt) => ({
        url: `/posts/get-feed-post?search=${searchTxt}`,
        headers: {
          Authorization: getUserToken(),
        },
      }),
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useCreateUserPostsMutation,
  useSearchPostsQuery,
} = homeApi;
