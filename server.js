require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8000;

const isDev = process.env.NODE_ENV === "development";

const HOST = isDev ? "process.env.HOST" : "0.0.0.0";

app.listen(PORT, HOST, () => {
 console.log(`Server running at http://${HOST}:${PORT}`);
});



