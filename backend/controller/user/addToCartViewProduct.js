const addToCartModel = require("../../models/cardProduct");
const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProduct = await addToCartModel
      .find({ userId: currentUser })
      .populate("productId");

    res.json({
      data: allProduct,
      success: true,
      error: false,
      message: "ok",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
