// Import required modules
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
