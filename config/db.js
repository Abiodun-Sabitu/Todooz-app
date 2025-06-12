const mongoose = require('mongoose');
require ('dotenv').config();

const MONGO_URI  = process.env.DB_CONNECTION_STRING
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.