import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";

export const profileApi = createApi({
  reducerPath: "profile.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/get-user-profile",
        headers: {
          Authorization: getUserToken(),
        },
      }),
      providesTags: ["Profile"],
    }),
    updateUserPosts: builder.mutation({
      query: ({ ...rest }) => ({
        url: "/users/update-user-profile",
        method: "PATCH",
        body: rest,
        headers: {
          Authorization: getUserToken(),
        },
      }),
      invalidatesTags: ["Profile"],
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
