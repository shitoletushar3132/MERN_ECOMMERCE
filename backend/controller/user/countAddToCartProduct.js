const addToCartModel = require("../../models/cardProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });

    res.json({
      data: {
        count: count,
      },
      message: "ok",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        err.message || "An error occurred while adding the product to the cart",
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
