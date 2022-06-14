const socketIO = require("socket.io");

const socketAuthorization = require("../middleware/socketAuthorization");

exports.sio = (server) => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.use(socketAuthorization).on("connection", (socket) => {
    console.log(socket.user);
    console.log(socket.id);
    console.log("A user is connected");

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.user.firstName,
      });
    }
    console.log(users);
    socket.emit("users", users);

    socket.on("join_room", (room) => {
      socket.join(room.roomId);
    });

    socket.on("message", ({ userId, receiverName, chat, room }) => {
      if (room.roomId) {
        io.in(room.roomId).emit("messageResponse", {
          userId,
          receiverName,
          chat,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.user.firstName} disconnected`);
    });
  });
};
