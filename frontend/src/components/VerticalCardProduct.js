import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
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
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
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
        {data.map((product, index) => (
          <Link
            to={"product/" + product?._id}
            key={index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow  mb-4"
          >
            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
              <img
                src={product.productImage[0]}
                alt={product.productName}
                className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
              />
            </div>

            <div className="p-4 grid gap-3 ">
              <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">
                {product?.productName}
              </h2>

              <p className="capitalize text-slate-500">{product?.category}</p>
              <div className="flex gap-2 md:gap-3">
                <p className="text-red-600 font-medium">
                  {displayINRCurrency(product?.sellingPrice)}
                </p>
                <p className="text-slate-500 line-through">
                  {displayINRCurrency(product?.price)}
                </p>
              </div>

              <button
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 m-2 rounded-full"
                onClick={(e) => handleAddToCart(e, product?._id)}
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

export default VerticalCardProduct;
