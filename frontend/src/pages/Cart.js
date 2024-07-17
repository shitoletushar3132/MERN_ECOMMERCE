import React, { useContext, useEffect, useState } from "react";
import summaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.addToCartProductView.url, {
        method: summaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setLoading(false);
      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error("Failed to fetch cart data:", responseData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(summaryApi.updateCartProduct.url, {
        method: summaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: qty + 1,
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decresesQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await fetch(summaryApi.updateCartProduct.url, {
          method: summaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: qty - 1,
            _id: id,
          }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          fetchData();
        } else {
          console.error("Failed to update quantity:", responseData.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const deleteCardProduct = async (id) => {
    try {
      const response = await fetch(summaryApi.deleteCartProduct.url, {
        method: summaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => {
                return (
                  <div
                    key={"index" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div
                        className="absolute right-0 text-red-600 rounded-full px-3 p-2 hover:text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => deleteCardProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>

                      <div className="w-full flex justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            decresesQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* total product */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm border border-slate-300">
          {loading ? (
            <div className="h-36 bg-slate-200"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summery</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity : </p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total : </p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 text-white w-full">
                payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
