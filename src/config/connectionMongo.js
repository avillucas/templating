const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("Connected to MongoDB: "+process.env.MONGO_CONNECTION);
  } catch (err) {
    console.error("Error on  MongoDB's connection", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;