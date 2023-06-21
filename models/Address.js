const mongoose = require("mongoose");
const { Schema } = mongoose;
const AddressSchema = new Schema({
  addressId: { type: String, required: true },
  userId: { type: String, required: true },
  addresses: [{ type: mongoose.Schema.Types.Mixed }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Address = mongoose.model("address", AddressSchema);

module.exports = Address;
