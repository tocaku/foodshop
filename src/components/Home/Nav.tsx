import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/man.png";
import wishlistIcon from "../../assets/heart.png";
import searchIcon from "../../assets/loupe.png";
import shoppingIcon from "../../assets/shopping-bag.png";
import "../../App.css";
import {
  useGetCartQuery,
  useGetUserAccountsListQuery,
  useGetWishlistQuery,
  useSingleUserQuery,
} from "../../redux/features/food/foodApi";
import { ICart, IUser } from "../../types/globalType";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userImage, setUserImage] = useState(userIcon);
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);
  const userToken = localStorage.getItem("token"); // Check if user is logged in
  const userId = localStorage.getItem("user_id"); // Check if user is logged in
  const navigate = useNavigate();
  const { data: user } = useSingleUserQuery(userId);
  const { data: userList } = useGetUserAccountsListQuery(undefined);
  const filteredUser = userList?.find((SingleUser: IUser) => {
    return SingleUser?.user === user?.username;
  });
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { data: cartData } = useGetCartQuery(filteredUser?.id);
  const { data: wishlistData } = useGetWishlistQuery(filteredUser?.id);
  useEffect(() => {
    if (wishlistData?.length > 0) {
      setWishlistLength(wishlistData.length);
    }
  }, [wishlistData]);

  useEffect(() => {
    if (cartData?.length > 0) {
      let totalQuantity = 0;
      cartData.forEach((cart: ICart) => {
        totalQuantity += cart.quantity;
      });
      setCartLength(totalQuantity);
    }
  }, [cartData]);
  useEffect(() => {
    if (userId && filteredUser?.image) {
      setUserImage(filteredUser.image);
    }
  }, [wishlistData, cartData, userList, user, userId, filteredUser]);

  const handleCart = () => {
    navigate("/cart", { replace: true });
  };
  const handleWishlist = () => {
    navigate("/wishlist", { replace: true });
  };
  const handleMenu = () => {
    navigate("/menu", { replace: true });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setDropdownOpen(false);
    Swal.fire({
      title: "Logged out!",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#C00A27",
    });
    setWishlistLength(0);
    setCartLength(0);
    setUserImage(userIcon);
  };
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 62) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <div
      className={`${
        scrolled
          ? "top-0 shadow-2xl fixed bg-opacity-95 bg-white"
          : "top-0 bg-opacity-80 bg-white"
      } z-40 w-full transition-all ease-in-out duration-1000`}
    >
      {/* Main Navbar */}
      <div className="navbar lg:px-16 md:px-10 px-6 py-3">
        <div className="navbar-start">
          {/* Mobile Menu Icon */}
          <button onClick={toggleSidebar} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <img
            src="https://yummi-theme.myshopify.com/cdn/shop/files/logo_3.png?v=1623913640&width=80"
            alt="Logo"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex justify-between px-1">
            <Fade cascade direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
            </Fade>
            <Fade cascade delay={100} direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About
                </NavLink>
              </li>
            </Fade>
            <Fade cascade delay={200} direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Gallery
                </NavLink>
              </li>
            </Fade>
            <Fade cascade delay={300} direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/cuisines"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Cuisines
                </NavLink>
              </li>
            </Fade>
            <Fade cascade delay={400} direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Menu
                </NavLink>
              </li>
            </Fade>
            <Fade cascade delay={500} direction="up" duration={1000}>
              <li>
                <NavLink
                  to="/discount"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Discount
                </NavLink>
              </li>
            </Fade>
          </ul>
        </div>
        <div className="navbar-end flex relative">
          {/* User Icon with Dropdown */}
          <div className="relative">
            <img
              className="w-[30px] h-[30px] ml-5 cursor-pointer rounded-full"
              src={userId ? userImage : userIcon}
              alt="User Icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-30">
                {userToken && userId ? (
                  <>
                    {filteredUser?.role === "Admin" ? (
                      <NavLink
                        to={`/dashboard`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    ) : (
                      <NavLink
                        to={`/profile/${filteredUser?.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                    )}

                    <NavLink
                      to="/"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="indicator" onClick={handleWishlist}>
            <span className="indicator-item bg-white border-[2px] border-zinc-900 text-zinc-900 px-[6px] text-sm rounded-2xl">
              {wishlistLength || "0"}
            </span>
            <img
              className="w-[30px] h-[30px] ml-5"
              src={wishlistIcon}
              alt="Wishlist Icon"
            />
          </div>
          <div className="indicator" onClick={handleCart}>
            <span className="indicator-item bg-white border-[2px] border-zinc-900 text-zinc-900 px-[6px] text-sm rounded-2xl">
              {cartLength || "0"}
            </span>
            <img
              className="w-[30px] h-[30px] ml-5"
              src={shoppingIcon}
              alt="Shopping Bag Icon"
            />
          </div>
          <div onClick={handleMenu}>
            <img
              className="w-[30px] h-[30px] ml-5"
              src={searchIcon}
              alt="Shopping Bag Icon"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-base-100 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={closeSidebar}
          className="p-4 text-xl font-semibold text-right w-full"
        >
          &times;
        </button>
        <ul className="p-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cuisines"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Cuisines
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/discount"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Discount
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
