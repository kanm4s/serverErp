require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const authorization = require("./middleware/authorization");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auths", authRoute);
app.use("/users", authorization, userRoute);
app.use("/projects", authorization, projectRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
