const mongoose = require('mongoose');
require('dotenv').config()

const connection = async () => {
  try {
    // Attempt to connect to MongoDB using the provided URL from the environment variables
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    // If an error occurs during the connection, log the error message
    console.log(error);
  }
};

const PORT = process.env.PORT

module.exports = { connection, PORT};