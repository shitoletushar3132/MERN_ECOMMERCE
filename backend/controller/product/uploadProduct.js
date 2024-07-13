const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = new productModel(req.body);

    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
