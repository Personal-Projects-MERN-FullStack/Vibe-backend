const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://vibeuser1:vaibhav@cluster0.9qofxzb.mongodb.net/";
// const mongoURI = "mongodb://localhost:27017/vibebackend";

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
