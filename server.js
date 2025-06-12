const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db'); 
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Connect to the database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, Todo App!');
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
