// Import required modules
const express = require('express');
const app = express()
const cors = require('cors')
const bodyparser = require("body-parser");
const connectToMongo = require('./database/db');

// Importing the Routes
const authroutes = require("./routes/auth")
const Products = require('./routes/Products')
// creating the use cases
app.use(cors())

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth',authroutes)
app.use('/product',Products)
app.get('/', (req, res) => {
  res.send("hellow world");
});


// Start the server
const port = 5000;
app.listen(port, () => {
  connectToMongo()
});
