const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://vibeuser1:vaibhav@cluster0.9qofxzb.mongodb.net/vibebackend?retryWrites=true&w=majority";
// const mongoURI = "mongodb://localhost:27017/vibebackend";

mongoose.set("strictQuery", true);

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToMongo;
