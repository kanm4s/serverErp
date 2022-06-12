const jwt = require("jsonwebtoken");

module.exports = function (socket, next) {
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
};
