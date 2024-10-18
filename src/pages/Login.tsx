import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const getValue = (id: string): string => {
  const element = document.getElementById(id) as HTMLInputElement | null;
  return element ? element.value : "";
};

const Login: React.FC = () => {
  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");

    if (username && password) {
      try {
        const response = await fetch(
          "https://food-backend-ohlq.onrender.com/user_accounts/login/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );
        const data = await response.json();

        if (response.ok && data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          Swal.fire({
            title: "Success!",
            text: "Login successful. Redirecting...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            confirmButtonColor: "#C00A27",
          }).then(() => {
            window.location.href = "https://yummi-tummy.netlify.app";
          });
        } else {
          Swal.fire({
            title: "Login Failed",
            text: data.message || "Invalid credentials",
            icon: "error",
            confirmButtonColor: "#C00A27",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        Swal.fire({
          confirmButtonColor: "#C00A27",
          title: "Error",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      Swal.fire({
        confirmButtonColor: "#C00A27",
        title: "Input Error",
        text: "Please provide both username and password.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full">
      <div
        style={{ backgroundPosition: "100% 8%" }}
        className="hero bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320&width=1920)] bg-no-repeat bg-cover"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content py-10 flex-col">
          <p className="text-[36px] font-bold text-white text-center">
            Account
          </p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Login
          </p>
        </div>
      </div>
      <div className="relative bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/bg-img-1_1.png?v=1614334735&width=1920)] bg-no-repeat bg-cover">
        <div className="mx-auto w-full md:w-[75%] lg:w-[50%] z-0 bg-[white] mb-10 mt-10 bg-opacity-95 shadow-2xl rounded-lg">
          <div className="px-8 md:px-16 lg:px-28 pb-14 pt-5">
            <p className="mb-5 text-center text-[#3a3a3a] text-[24px] md:text-[30px] font-bold">
              Login
            </p>
            <form onSubmit={handleLogin}>
              <label className="form-control w-full my-5">
                <input
                  id="login-username"
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-5">
                <input
                  id="login-password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
              </label>
              <div className="flex justify-center mb-5">
                <Link to="/register">
                  <p className="text-gray-500 text-[14px] font-semibold">
                    Don't Have An Account?
                  </p>
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C00A27] text-white text-[15px] font-semibold rounded-md"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
