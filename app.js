require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
