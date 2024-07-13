import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../pages/addToCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setLoading(false);
      setData(categoryProduct.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white rounded-full p-2 m-2 shadow absolute left-0 hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full p-2 m-2 shadow absolute right-0 hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mb-4"
              >
                <div className=" h-full p-4 min-w-[120px] md:min-w-[145px] bg-slate-200"></div>
                <div className="p-4 overflow-hidden">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1"></p>
                  <div className="flex gap-2 md:gap-3 p-1 bg-slate-200">
                    <p className="text-red-600 font-medium p-1"></p>
                    <p className="text-slate-500 line-through p-1"></p>
                  </div>
                  <button className="text-sm bg-slate-200 text-white px-2 py-1 m-2 rounded-full w-full"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={"product/" + product._id}
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mb-4"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  {product.productImage.length > 0 ? (
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4 overflow-hidden">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-2 md:gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 m-2 rounded-full"
                    onClick={(e) => addToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
