import { io } from "socket.io-client";
import { getUserToken } from "../../../../utils/getSessionData";
import { successToaster } from "../../../../utils/toaster";
import { useState } from "react";
import ChatWindow from "./chat-window/ChatWindow";
import UsersList from "./users-list/UsersList";
import {
  useGetConversationListQuery,
  // useGetConversationQuery,
} from "../../../../features/chats/chats";
const socket = io("http://localhost:4004", {
  extraHeaders: {
    token: getUserToken(),
  },
});
socket.on("connect", () => {
  successToaster("connected");
  console.log({ socket });
});

function Conversation() {
  const {
    data: conListData,
    // error: conListError,
    // isLoading: conListLoading,
  } = useGetConversationListQuery();
  // const { data, error, isLoading } = useGetConversationQuery();
  const [receiverId, setReceiverId] = useState("");
  // console.log(receiverId);
  return (
    <div>
      <UsersList
        conListData={conListData}
        receiverId={receiverId}
        setReceiverId={setReceiverId}
      />
      <ChatWindow
        conListData={conListData}
        receiverId={receiverId}
        socket={socket}
      />
    </div>
  );
}

export default Conversation;
