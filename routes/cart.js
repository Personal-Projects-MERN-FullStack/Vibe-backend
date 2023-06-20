const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/getcart/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/addtocart/:user_id", async (req, res) => {
  try {
    const { userId, items } = req.body;
    const cartId = Math.floor(Math.random() * (9999 - 1000) + 1000);
    // Check if cart already exists
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists, update items and updatedAt time
      cart.items = items;
      cart.updatedAt = new Date();
    } else {
      // Cart doesn't exist, create a new one
      cart = new Cart({
        cartId,
        userId,
        items,
      });
    }

    await cart.save();

    res.json({ message: "Cart created/updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
});

module.exports = router;
