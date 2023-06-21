// Import required modules
const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema({
  orderid: {
    type: Number,
    required: true,
  },
  customerid: {
    type: String,
    required: true,
  },
  orderdate: {
    type: Date,
    default: Date.now,
  },
  orders: [{ type: mongoose.Schema.Types.Mixed }],
  totalbill: {
    type: Number,
    required: true,
  },
  paymentstatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
});

// Create and export the Order model
Order = mongoose.model("Order", orderSchema);

module.exports = Order;
