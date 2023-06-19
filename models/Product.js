const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  reviews: {
    type: [
      {
        // Define your review schema here
        // For example: { userId: String, rating: Number, comment: String }
      }
    ],
    default: [],
  },
  availability: {
    inStock: {
      type: Boolean,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    locations: [
      {
        storeName: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },
      }
    ],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
