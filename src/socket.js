import { io } from "socket.io-client";
import { __BASE_URL__ } from "./utils/constants";

const URL = __BASE_URL__ + "/game";

export const socket = io(URL, {
  autoConnect: false,
});
