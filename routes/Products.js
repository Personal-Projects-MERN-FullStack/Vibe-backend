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
router.post('/products/:id/reviews', async (req, res) => {
  const id = req.params.id;
  const review = req.body;
  console.log(review)
  try {
    // Find the product by ID
    const product = await Product.findOne({id});

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Push the review into the product's reviews array
    product.reviews.push(review);

    // Save the updated product
    await product.save();

    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
