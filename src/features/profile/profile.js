import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";
import { errorToaster } from "./../../utils/toaster";

export const profileApi = createApi({
  reducerPath: "profile.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Authorization", getUserToken());
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/get-user-profile",
      }),
      providesTags: ["Profile"],
    }),
    updateUserPosts: builder.mutation({
      query: ({ ...rest }) => ({
        url: "/users/update-user-profile",
        method: "PATCH",
        body: rest,
      }),
      async onQueryStarted({ ...args }, { dispatch, queryFulfilled }) {
        try {
          const { data: update } = await queryFulfilled;
          dispatch(
            profileApi.util.updateQueryData(
              "getUserProfile",
              undefined,
              (draft) => {
                draft.data = update.data;
              }
            )
          );
        } catch (error) {
          errorToaster(error);
        }
      },
    }),
    // searchPosts: builder.query({
    //   query: (searchTxt) => ({
    //     url: `/posts/get-feed-post?search=${searchTxt}`,
    //     headers: {
    //       Authorization: sessionStorage.getItem("userToken"),
    //     },
    //   }),
    // }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserPostsMutation } =
  profileApi;
