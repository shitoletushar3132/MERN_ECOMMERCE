const addToCartModel = require("../../models/cardProduct");

const addToCardController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Check if the product is already in the cart
    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) {
      return res.status(200).json({
        message: "Product already exists in the cart",
        success: false,
        error: true,
      });
    }

    // Create the payload for the new cart item
    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    // Add the product to the cart
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(201).json({
      data: saveProduct,
      message: "Product added to cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "An error occurred while adding the product to the cart",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCardController;
