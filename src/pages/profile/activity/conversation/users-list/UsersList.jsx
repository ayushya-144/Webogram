import { useSearchParams } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../../../features/profile/profile";

function UsersList({ conListData, receiverId, setReceiverId }) {
  // getting all users list
  const { data } = useGetAllUsersQuery();

  //mapping all users list
  const usersList = data?.data?.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.firstname} {user.lastname}
      </option>
    );
  });

  // setting search param for conversationList
  const [conversationId, setConversationId] = useSearchParams({
    conversationId: "",
  });

  // mapping all conversation List data
  const conList = conListData?.data?.map((con) => {
    if (con.conversationId === conversationId.get("conversationId")) {
      setReceiverId(con.chatUser._id);
    }
    return (
      <option key={con.conversationId} value={con.conversationId}>
        {con.chatUser.firstname} {con.chatUser.lastname}
      </option>
    );
  });

  // // on select user
  // const handleDropDownChange = (e) => {
  //   const receiver = JSON.parse(e.target.value);
  //   setReceiverId(receiver.chatUser._id);
  //   setConversationId((prev) => {
  //     if (receiver.chatUser._id !== "") {
  //       console.log(receiver.conversationId);
  //       prev.set("conversationId", receiver.conversationId);
  //       return prev;
  //     } else {
  //       prev.delete("conversationId");
  //       return prev;
  //     }
  //   });
  // };
  const handleDropDownChange = (e) => {
    const receiver = e.target.value;
    conListData?.data?.map((con) => {
      if (con.conversationId === receiver) {
        setReceiverId(con.chatUser._id);
      }
    });
    setConversationId((prev) => {
      console.log(receiver);
      if (receiver !== "") {
        prev.set("conversationId", receiver);
        return prev;
      } else {
        prev.delete("conversationId");
        return prev;
      }
    });
  };

  return (
    <div className="container d-flex">
      <select
        className="container form-select text-center mt-2"
        onChange={(e) => {
          setReceiverId(e.target.value);
        }}
        value={receiverId}
      >
        <option value="">Add Users to chat with</option>
        {usersList}
      </select>
      <select
        className="container form-select text-center mt-2 mx-2"
        onChange={(e) => {
          handleDropDownChange(e);
        }}
        value={
          conversationId.get("conversationId")
            ? conversationId.get("conversationId")
            : ""
        }
      >
        <option value="">Conversation List</option>
        {conList}
      </select>
    </div>
  );
}

export default UsersList;
