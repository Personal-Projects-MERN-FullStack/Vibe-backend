const mongoose = require("mongoose");
// const mongoURI = 'mongodb+srv://spv:vaibhavprasadsainath@cluster0.exmgbgb.mongodb.net/labourconnect?retryWrites=true&w=majority'
const mongoURI = "mongodb://localhost:27017/vibebackend";


const connectToMongo = () => {
  mongoose.connect(mongoURI);

  mongoose.connection.on("connected", () => {
    console.log("Connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

module.exports = connectToMongo;


