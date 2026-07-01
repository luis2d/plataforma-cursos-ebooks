const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

module.exports = app;
