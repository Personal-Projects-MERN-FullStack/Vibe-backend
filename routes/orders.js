const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/saveorders", async (req, res) => {
  try {
    // Generate 10-digit order ID
    const orderid = Math.floor(1000000000 + Math.random() * 9000000000);

    // Create the order document
    const order = new Order({
      orderid,
      customerid: req.body.customerid,
      orders: req.body.orders,
      totalbill: req.body.totalbill,
      paymentstatus: req.body.paymentstatus,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});
router.get("/getorderbyorderid/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      // Find the order by its order ID
      const order = await Order.findOne({ orderid: orderId });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Return the order as a response
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
router.get("/getorderbycustomerid/:customerid", async (req, res) => {
    try {
      const customerid = req.params.customerid;
  
      // Find the order by its order ID
      const order = await Order.findOne({ customerid: customerid });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Return the order as a response
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;