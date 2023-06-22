const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
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

router.post("/orders", async (req, res) => {
  try {
    const { customerid, orders, totalbill ,Address} = req.body;

    // Generate a 10-digit order ID
    const orderid = generateOrderId();

    // Create a new order
    const newOrder = new Order({
      orderid,
      customerid,
      orders,
      totalbill,
      Address
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Deduct stock from products and update orderIds
    await updateProducts(savedOrder);

    res.json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to generate a 10-digit order ID
function generateOrderId() {
  const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomId.toString();
}

// Helper function to update products by deducting stock and updating orderIds
async function updateProducts(order) {
  const { orders } = order;
  const orderIds = [];
  // console.log(order)
  for (const orderItem of orders) {
    console.log(orderItem.id);
    const id = orderItem.id;
    const qty = orderItem.qty;
    console.log(qty);

    // Find the product
    // console.log(typeof id);
    const product = await Product.findOne({ id: id });

    // console.log(product)
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    // Check if there is sufficient stock
    if (product.availability.quantity < qty) {
      throw new Error(`Insufficient stock for product with ID ${id}`);
    }

    // Deduct stock
    product.availability.quantity -= qty;

    // Add order ID to product's orderIds array
    orderIds.push(order.orderid);
    product.orderIds.push(order.orderid);

    // Save the updated product
    await product.save();
  }

  return orderIds;
}

module.exports = router;
