const express = require("express");
const Address = require("../models/Address");
const router = express.Router();

router.get("/getaddress/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const address = await Address.findOne({ userId });

    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/getaddress", async (req, res) => {
  try {
    const { userId, items } = req.body;
    // console.log(req.body.userId)
    
    const addressId = Math.floor(Math.random() * (9999 - 1000) + 1000);
    // Check if address already exists
    let addressexist = await Address.findOne({ userId });

    if (addressexist) {
      // address exists, update items and updatedAt time
      addressexist.addresses = items;
      addressexist.updatedAt = new Date();
    } else {
      // address doesn't exist, create a new one
      addressexist = new Address({
        addressId,
        userId,
        addresses:items,
      });
    }

    await addressexist.save();

    res.json({ message: "address created/updated successfully", address:[addressexist] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
});

module.exports = router;
