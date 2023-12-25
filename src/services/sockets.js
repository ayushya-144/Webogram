import { io } from "socket.io-client";
import { getUserToken } from "../utils/getSessionData";

const socket = io("http://localhost:4004", {
  extraHeaders: {
    token: getUserToken(),
  },
});
export default socket;
