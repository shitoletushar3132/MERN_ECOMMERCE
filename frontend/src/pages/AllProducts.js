import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../common";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(summaryApi.getProduct.url, {
        method: summaryApi.getProduct.method,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allproduct"}
            fetchdata={fetchAllProducts}
          />
        ))}
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  );
}

export default AllProducts;
