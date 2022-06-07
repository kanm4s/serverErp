require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const authorization = require("./middleware/authorization");
const authRoute = require("./routes/authRoute");
const commuController = require("./routes/commuRoute");

const app = express();
const http = require("http");

const socketUtils = require("./utils/socketUtils");
const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auths", authRoute);
app.use("/users", authorization, userRoute);
app.use("/projects", authorization, projectRoute);
app.use("/communicates", authorization, commuController);

app.use(errorMiddleware);

app.use("/api/vi/hello", authorization, socketIOMiddleware, (req, res) => {
  req.io.emit("message", `Hello, ${req.originalUrl}`);
  res.send("hello world");
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`server running on port ${port}`));

// server.listen(3000, () => {
//   console.log("listening on :3000");
// });
