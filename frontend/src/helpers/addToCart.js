import summaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await fetch(summaryApi.addToCartProduct.url, {
      method: summaryApi.addToCartProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }

    return responseData;
  } catch (error) {
    toast.error("An error occurred while adding the product to the cart.");
    console.error("Error:", error);
  }
};

export default addToCart;
