require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});


