const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  category: String,
  name: String,
  price: Number,
  brand: String,
  description: String,
  features: [String],
  reviews: [
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ],
  availability: {
    inStock: Boolean,
    quantity: Number,
    sellerId: String,
  },
  image: String,
  orderIds: {
    type: Array,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
