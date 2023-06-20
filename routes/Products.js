const express = require("express");
const Product = require("../models/Product");
const router = express.Router(); 

router.post("/getproducts", async (req, res) => {
 
  const response = Product.create(req.body)
  if(response){
    res.send({
        status :true
    })
  }
  else{
    res.send({
        status: false
    })
  }
});

module.exports = router;
