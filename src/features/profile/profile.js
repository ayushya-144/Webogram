import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";
import { errorToaster } from "./../../utils/toaster";

export const profileApi = createApi({
  reducerPath: "profile.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1/users",
    prepareHeaders: (headers) => {
      headers.set("Authorization", getUserToken());
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/get-user-profile",
      }),
      providesTags: ["Profile"],
    }),
    updateUserPosts: builder.mutation({
      query: ({ ...rest }) => ({
        url: "/update-user-profile",
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
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-all-users",
      }),
      providesTags: ["Profile"],
    }),
    getFollowRequests: builder.query({
      query: () => ({
        url: "/get-follow-requests",
      }),
      providesTags: ["Profile"],
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: "/follow-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    acceptFollowRequest: builder.mutation({
      query: (data) => ({
        url: "/accept-follow-requests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserPostsMutation,
  useGetAllUsersQuery,
  useGetFollowRequestsQuery,
  useFollowUserMutation,
  useAcceptFollowRequestMutation,
} = profileApi;
