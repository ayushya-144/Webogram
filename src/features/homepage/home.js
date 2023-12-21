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
      async onQueryStarted(
        { ...args },
        { dispatch, queryFulfilled, getState }
      ) {
        const apiState = getState();
        const state = apiState["home.api"];

        const { data: create } = await queryFulfilled;
        for (const key in state.queries) {
          let query;
          query = state.queries[key].originalArgs;
          const cb = (draft) => {
            if (create.data.title.includes(query.search)) {
              for (const subKey in query) {
                if (Boolean(query[subKey]) == create.data[subKey]) {
                  draft.data.unshift(create.data);
                  draft.total++;
                }
              }
            }
          };
          updateQueryData(homeApi, "getUserPosts", dispatch, query, cb);
        }
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
