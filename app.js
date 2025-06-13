const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./config/logger");

app.use(express.json());
app.use(cookieParser());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.get("/", (req, res) => {
  res.send("Hello, Todo App!");
});

module.exports = app;
// This is the main Express app setup with JSON parsing, cookie parsing, and logging using Morgan and Winston.