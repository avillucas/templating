const mongoose = require("mongoose");
const connectDB = mongoose
  .connect(process.env.MONGO_CONNECTION ?? "mongodb://mongo:27017/gdp")
  .then(() => console.log("Mongoose connected"))
  .catch((e) => console.log(e));

module.exports = connectDB;
