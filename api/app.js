const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routers/userRouter");

const app = express();
// app.enable("trust proxy");

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/users", userRouter);
app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", message: "Hello World Again" });
});

module.exports = app;
