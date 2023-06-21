const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema({
  cartId: { type: String, required: true },
  userId: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.Mixed }], // Assuming items contain a list of strings (product IDs, for example)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;
