const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: String,
    quantity: Number,
    userId: String,
  },
  {
    timeStamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;
