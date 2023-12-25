import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/getSessionData";
import socket from "../../services/sockets";
import { errorToaster } from "../../utils/toaster";

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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            updateCachedData((draft) => {
              console.log(JSON.parse(JSON.stringify(draft)));
              draft.data.data.unshift(event.data);
            });
          };
          socket.addEventListener("getMessage", listener);
        } catch (error) {
          errorToaster(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useGetConversationListQuery, useGetConversationQuery } =
  chatsApi;
