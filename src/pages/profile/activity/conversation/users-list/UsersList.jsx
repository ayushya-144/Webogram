import { useSearchParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../../../features/profile/profile";
import { useGetConversationQuery } from "../../../../../features/chats/chats";

function UsersList({ conListData, receiverId, setReceiverId }) {
  const { data } = useGetAllUsersQuery();
  // console.log("conListData", conListData);
  // console.log(data?.data);
  const usersList = data?.data?.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.firstname} {user.lastname}
      </option>
    );
  });
  const conList = conListData?.data?.map((con) => {
    return (
      <option key={con.conversationId} value={JSON.stringify(con)}>
        {con.chatUser.firstname} {con.chatUser.lastname}
      </option>
    );
  });
  const [conversationId, setConversationId] = useSearchParams({
    conversationId: "",
  });
  const handleDropDownChange = (e) => {
    const receiver = JSON.parse(e.target.value);
    setReceiverId(receiver.chatUser._id);
    setConversationId((prev) => {
      if (receiver.chatUser._id !== "") {
        console.log(receiver.conversationId);
        prev.set("conversationId", receiver.conversationId);
        return prev;
      } else {
        prev.delete("conversationId");
        return prev;
      }
    });
  };

  return (
    <>
      <select
        className="container form-select text-center mt-2"
        onChange={(e) => {
          setReceiverId(e.target.value);
        }}
        value={receiverId}
      >
        <option value="">Select User to Chat</option>
        {usersList}
      </select>
      <select
        className="container form-select text-center mt-2"
        onChange={(e) => {
          handleDropDownChange(e);
        }}
        value={conversationId}
      >
        <option value="">Select User to Chat</option>
        {conList}
      </select>
    </>
  );
}

export default UsersList;
