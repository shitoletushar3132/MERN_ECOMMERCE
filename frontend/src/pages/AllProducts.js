import React from "react";

function AllProducts() {
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button className="border-2 border-red-600 py-1 px-3 rounded-full ">
          Upload Product
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
