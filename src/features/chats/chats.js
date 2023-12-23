import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";

export const chatsApi = createApi({
  reducerPath: "chats.api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4004/api/v1/chats",
    prepareHeaders: (headers) => {
      headers.set("Authorization", getUserToken());
    },
  }),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    getConversationList: builder.query({
      query: () => ({
        url: "/get-conversations-list",
      }),
      providesTags: ["Chats"],
    }),
    getConversation: builder.query({
      query: (conversationId) => ({
        url: "/get-conversation",
        params: {
          conversationId: conversationId,
        },
      }),
      providesTags: ["Chats"],
    }),
  }),
});

export const { useGetConversationListQuery, useGetConversationQuery } =
  chatsApi;
