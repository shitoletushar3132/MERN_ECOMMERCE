const productModel = require("../../models/productModel");

const categoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });
    res.json({
      data: product,
      success: true,
      error: false,
      message: "product",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = categoryWiseProduct;
