const addToCartModel = require("../../models/cardProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { _id: addToCartProductId, quantity: qty } = req.body;
    console.log(req.body);

    if (!addToCartProductId || qty === undefined) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
        error: true,
        success: false,
      });
    }

    if (qty < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive number",
        error: true,
        success: false,
      });
    }

    const updateProduct = await addToCartModel.findOneAndUpdate(
      { _id: addToCartProductId, userId: currentUserId },
      { $set: { quantity: qty } },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
