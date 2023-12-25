import { useSearchParams } from "react-router-dom";
import "./chat-window.css";
import { useState } from "react";
import { useGetConversationQuery } from "../../../../../features/chats/chats";
import Card from "react-bootstrap/Card";
import socket from "../../../../../services/sockets";

function ChatWindow({ receiverId }) {
  const [message, setMessage] = useState("");

  // Setting search params to start chat
  const [
    conversationId,
    // setConversationId
  ] = useSearchParams({
    conversationId: "",
  });

  // Getting Individual Conversation List
  const conId = conversationId.get("conversationId");
  const {
    data: chatList,
    // error: chatError,
    // isLoading: chatLoading,
  } = useGetConversationQuery(conId, {
    skip: conId === "" || conId === undefined,
  });

  // Sending Message
  const handleFormSubmission = () => {
    socket.emit("sendMessage", {
      receiverId: receiverId,
      content: message,
    });
    setMessage("");
  };

  // mapping chatList data
  const chatListData = chatList?.data?.data
    .slice(0)
    .reverse()
    .map((chat) => {
      return (
        <div
          key={chat._id}
          className={`mt-1 mb-1 d-flex flex-column align-items-${
            receiverId !== chat.senderId && "end"
          }`}
        >
          <Card
            className={`shadow message-popup border px-3 p-1 d-flex bg-primary text-white align-items-${
              receiverId !== chat.senderId && "end bg-success"
            }`}
          >
            <Card.Text>{chat.content}</Card.Text>
          </Card>
        </div>
      );
    });

  return (
    <div className="container container-chat-window border mt-2 d-flex flex-column justify-content-between rounded">
      <h1 className="text-center">Chat</h1>
      <div
        style={{
          backgroundColor: "whitesmoke",
        }}
        className="container container-chat-box overflow-auto w-100 border shadow p-3"
      >
        {chatListData}
      </div>
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Type Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          disabled={receiverId === ""}
        />
        <button
          className="btn btn-primary rounded-0"
          onClick={handleFormSubmission}
          disabled={receiverId === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
