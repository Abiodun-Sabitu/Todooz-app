const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./config/logger");
const path = require('path');
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasksRouter");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", authMiddleware, taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
   res.render("index");
});

app.use((req, res, next) => {
  res.status(404).render('404');
});



app.use(errorHandler);
module.exports = app;
// This is the main Express app setup with JSON parsing, cookie parsing, and logging using Morgan and Winston.