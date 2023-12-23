import { useSearchParams } from "react-router-dom";
import "./chat-window.css";
import { useEffect, useState } from "react";
import { useGetConversationQuery } from "../../../../../features/chats/chats";
import Card from "react-bootstrap/Card";
function ChatWindow({ socket, receiverId }) {
  const [message, setMessage] = useState("");
  const [
    conversationId,
    // setConversationId
  ] = useSearchParams({
    conversationId: "",
  });
  const conId = conversationId.get("conversationId");
  const {
    data: chatList,
    // error: chatError,
    // isLoading: chatLoading,
  } = useGetConversationQuery(conId, {
    skip: conId === "" || conId === undefined,
  });
  socket.on("getMessage", (response) => {
    console.log(response);
    handleReceivingMessage(response);
  });
  console.log(chatList);
  const handleFormSubmission = () => {
    socket.emit("sendMessage", {
      receiverId: receiverId,
      content: message,
    });
    setMessage("");
  };
  const handleReceivingMessage = (response) => {
    console.log("response", response);
  };

  const chatListData = chatList?.data?.data.map((chat) => {
    return (
      <div key={chat._id} className="mt-1 mb-1 d-flex flex-column">
        <Card
          className={`shadow border p-1 d-flex align-items-${
            receiverId !== chat.senderId && "end"
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
          overflowX: "auto",
        }}
        className="container d-flex flex-column justify-content-end flex-grow-1 w-100 border shadow"
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
