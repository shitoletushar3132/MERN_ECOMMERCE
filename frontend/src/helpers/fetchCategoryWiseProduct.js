const { default: summaryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(summaryApi.categoryWiseProduct.url, {
      method: summaryApi.categoryWiseProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchCategoryWiseProduct;
