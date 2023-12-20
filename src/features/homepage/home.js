import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";
import { updateQueryData } from "../../utils/manualUpdateCacheData";

export const homeApi = createApi({
  reducerPath: "home.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Authorization", getUserToken());
    },
  }),

  endpoints: (builder) => ({
    getUserPosts: builder.query({
      query: (filter) => ({
        url: "/posts/get-feed-post",
        params: {
          ...filter,
        },
      }),
    }),
    createUserPosts: builder.mutation({
      query: (post) => ({
        url: "/posts/create-post",
        method: "POST",
        body: post,
      }),
      onQueryStarted({ ...args }, { dispatch, queryFulfilled, getState }) {
        updateQueryData(
          getState,
          homeApi,
          "getUserPosts",
          dispatch,
          queryFulfilled
        );
      },
    }),
    searchPosts: builder.query({
      query: (searchTxt) => ({
        url: "/posts/get-feed-post",
        params: { search: searchTxt ? searchTxt : "" },
      }),
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useCreateUserPostsMutation,
  useSearchPostsQuery,
} = homeApi;
