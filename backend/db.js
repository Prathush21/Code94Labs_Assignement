const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI
// const DATABASE_NAME = process.env.DATABASE_NAME

// MongoDB connection string
//Configurations are hardcoded since pushing it to the github for evaluation purposes
const MONGODB_URI =
  "mongodb+srv://inparaj19:1234@cluster0.tfbuixl.mongodb.net/assignment?retryWrites=true&w=majority";
const DATABASE_NAME = "assignment";

// Function to create a database connection
async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    const db = client.db(DATABASE_NAME);
    return db;
  } catch (error) {
    throw error;
  }
}

module.exports = connectDB;
