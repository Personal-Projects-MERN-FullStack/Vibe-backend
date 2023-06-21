// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const connectToMongo = require("./database/db");

// Importing the Routes
const authroutes = require("./routes/auth");
const Products = require("./routes/Products");
const Cart = require("./routes/cart");
const Address = require("./routes/Address");
const Order = require("./routes/orders");
// creating the use cases
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authroutes);
app.use("/product", Products);
app.use("/cart", Cart);
app.use("/address", Address);
app.use("/order", Order);

app.get("/", (req, res) => {
  res.send("hellow world");
});

// Start the server
const port = 5000;
app.listen(port, () => {
  connectToMongo();
});
