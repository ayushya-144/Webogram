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

  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getUserPosts: builder.query({
      query: ({ ...filter }) => ({
        url: "/posts/get-feed-post",
        params: {
          search: filter.search,
          isMyPostsOnly: filter.isMyPostsOnly,
          isPrivate: filter.isPrivate,
        },
      }),
      providesTags: ["Posts"],
    }),
    createUserPosts: builder.mutation({
      query: (posts) => ({
        url: "/posts/create-post",
        method: "POST",
        body: posts.data,
      }),
      onQueryStarted({ ...args }, { dispatch, queryFulfilled }) {
        updateQueryData(
          homeApi,
          "getUserPosts",
          {
            search: args.search,
            isMyPostsOnly: args.isMyPostsOnly,
            isPrivate: args.isPrivate,
          },
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
