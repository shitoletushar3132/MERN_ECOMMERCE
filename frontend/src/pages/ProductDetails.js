import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.getProductDetails.url, {
      method: summaryApi.getProductDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("Coordinate", left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clienty - top) / height;

      setZoomImageCoordinate({
        x: x,
        y: y,
      });
    },
    [zoomImageCoordinate]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="min-h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseEnter={handleZoomImage}
            />
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, el) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={el}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full rounded">
                {data?.productImage?.map((imgUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgUrl}
                    >
                      <img
                        src={imgUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                        onClick={() => handleMouseEnterProduct(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product detail */}
        {loading ? (
          <div className="w-full">
            <div className="grid gap-1 w-full">
              <p className="bg-slate-200 animate-pulse rounded-full inline-block h-6 lg:h-8 w-full"></p>
              <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full lg:h-8"></h2>

              <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8"></p>
              <div className="text-red-600 flex items-center bg-slate-200 h-6 animate-pulse gap-1 w-full lg:h-8"></div>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full lg:h-8">
                <p className="text-red-600 bg-slate-200 w-full lg:h-8"></p>
                <p className="text-slate-500 line-through bg-slate-200 w-full lg:h-8"></p>
              </div>

              <div className="flex items-center gap-3 my-2 w-full lg:h-8">
                <button className="h-6 bg-slate-200 animate-pulse rounded w-full lg:h-8"></button>
                <button className="h-6 bg-slate-200 animate-pulse rounded w-full lg:h-8"></button>
              </div>

              <div className="w-full ">
                <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 animate-pulse w-full lg:h-8"></p>
                <p className=" bg-slate-200 animate-pulse rounded h-10 w-full lg:h-8"></p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium">
                {data?.productName}
              </h2>

              <p className="capitalize text-slate-400">{data?.category}</p>
              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                <p className="text-red-600">
                  {displayINRCurrency(data?.sellingPrice)}
                </p>
                <p className="text-slate-500 line-through">
                  {displayINRCurrency(data?.price)}
                </p>
              </div>

              <div className="flex items-center gap-3 my-2">
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                  Buy
                </button>
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] hover:text-red-600 hover:bg-white font-medium bg-red-600 text-white">
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium my-1">
                  Description :{" "}
                </p>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
