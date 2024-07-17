import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common";
import { useEffect, useState } from "react";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: "include", // Ensure cookies are sent with the request
      });

      const dataApi = await dataResponse.json();
      console.log("current user", dataApi);

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi));
        
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(summaryApi.addToCartProductCount.url, {
        method: summaryApi.addToCartProductCount.method,
        credentials: "include", // Ensure cookies are sent with the request
      });

      const dataApi = await dataResponse.json();

      setCartProductCount(dataApi?.data?.count);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();

    // user cart product
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider
      value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
    >
      <ToastContainer position="top-center" />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
