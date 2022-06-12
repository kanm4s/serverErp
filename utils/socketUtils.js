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
    let clients = io.sockets;
    // console.log(clients.sockets);
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.user.firstName,
      });
    }
    console.log(users);
    socket.emit("users", users);

    socket.join(socket.userID);

    // socket.on("message", ({ content, to }) => {
    //   socket.to(to).to(socket.userID).emit("private message", {
    //     content,
    //     from: socket.userID,
    //     to,
    //   });
    // });

    socket.on("message", ({ userId, receiverName, chat }) => {
      const receiverId = users.find((ele) => ele.username === receiverName);
      console.log(receiverId);

      console.log(`message from ${userId} to ${receiverName}: ${chat}`);
      io.to(receiverId.userID).emit("messageResponse", {
        userId,
        receiverName,
        chat,
      });
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.user.firstName} disconnected`);
    });
  });
};
