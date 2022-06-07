const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const authorization = require("../middleware/authorization");

exports.sio = (server) => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.JWT_SECRET_KEY,
        function (err, decoded) {
          if (err) return next(new Error("Authentication error"));
          socket.user = decoded;
          next();
        }
      );
    }
  }).on("connection", (socket) => {
    console.log(socket.user);
    console.log("A user is connected");

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.user.firstName,
      });
    }
    socket.emit("users", users);

    socket.on("message", ({ name, message }) => {
      console.log(`message from ${name} : ${message}`);
      io.emit("message", { name, message });
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.user.firstName} disconnected`);
    });
  });
};
