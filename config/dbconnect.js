const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connection.connection.name}`);
  } catch (error) {
    console.error(`${error.name}, : ${error.message}`);
    throw error;
  }
};
module.exports = connectDb;
// In the above code snippet, we have created a connectDb function that connects to the MongoDB database using the mongoose.connect() method. We have also used the dotenv package to load environment variables from the .env file. The MONGODB_URI environment variable contains the connection string for the MongoDB database.
