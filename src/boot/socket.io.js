import io from "socket.io-client";
const token = localStorage.getItem("token");

const socketOptions = {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: "Bearer " + token,
      },
    },
  },
};

var socketUrl = null;
if (document.location.origin === "http://localhost:8080") {
  socketUrl = "http://localhost:3330";
} else {
  socketUrl = document.location.origin;
}
var socket = io.connect(socketUrl, { transports: ["websocket"] });
socket.on("connect", () => {
  console.log("ready");
});

export default ({ Vue }) => {
  Vue.prototype.$socket = socket;
};
export { socket };
