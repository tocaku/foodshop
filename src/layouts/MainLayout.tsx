import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <img
            src="https://yummi-theme.myshopify.com/cdn/shop/files/Yummy-GIF.gif?v=1684403888&width=1920"
            alt=""
          />
          {/* Replace this with your loading spinner */}
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
