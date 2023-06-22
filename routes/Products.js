const express = require("express");
const Product = require("../models/Product");
const router = express.Router();


router.post("/saveproduct", async (req, res) => {
  try {
    const productData = req.body;

    // Create the product document
    const product = new Product(productData);

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product saved successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
});
// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.send(products);
//   } catch (error) {
//     res.status(500).send({
//       message: "An error occurred while fetching the products.",
//       error: error.message,
//     });
//   }
// });

module.exports = router;
