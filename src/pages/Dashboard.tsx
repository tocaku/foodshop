import { NavLink, Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
// import admin from "../assets/admin-panel2.png";
// import addMenu from "../assets/add-to-playlist.png";
// import ManageMenu from "../assets/menu2.png";
// import ManageHistor from "../assets/history2.png";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { RiMenuAddLine } from "react-icons/ri";
// import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div
        style={{ backgroundPosition: "100% 8%" }}
        className="hero bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320&width=1920)] bg-no-repeat bg-cover"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content py-10 flex-col">
          <p className="text-[36px] font-bold text-white text-center">
            Dashboard
          </p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Dashboard
          </p>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center relative">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="font-bold drawer-button lg:hidden mt-10 p-3 shadow shadow-[#C00A27] rounded"
          >
            {" "}
            DashBoard Manubar
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className="bg-base-200 text-base-content min-h-full sm:w-80 w-[280px] sm:px-6 px-2 py-12 "
            style={{ zIndex: "80" }}
          >
            {/* Sidebar content here */}
            <li className="mb-5 bg-white flex items-center justify-start p-2 rounded-lg border-[0.5px] shadow shadow-[#C00A27] group text-[15px] sm:text-[20px]">
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                    : "nav-link flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                }
              >
                <MdOutlineAdminPanelSettings className="mr-2" />
                Admin Profile
              </NavLink>
            </li>
            <li className="mb-5 bg-white flex items-center justify-start p-2 rounded-lg  shadow group sm:text-[20px] text-[15px] shadow-[#C00A27] ">
              <NavLink
                to="/dashboard/add_menu"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                    : "nav-link flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                }
              >
                <RiMenuAddLine className="mr-2" />
                Add Menu
              </NavLink>
            </li>
            <li className="mb-5 bg-white flex items-center justify-start p-2 rounded-lg  shadow group sm:text-[20px] text-[15px] shadow-[#C00A27] ">
              <NavLink
                to="/dashboard/manage_menu"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                    : "nav-link flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                }
              >
                <MdOutlineFastfood className="mr-2" />
                Manage Menu
              </NavLink>
            </li>
            <li className="mb-5 bg-white flex items-center justify-start p-2 rounded-lg  shadow group sm:text-[20px] text-[15px] shadow-[#C00A27] ">
              <NavLink
                to="/dashboard/history"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                    : "nav-link flex justify-start items-center group-hover:text-[#C00A27] transition-all duration-500"
                }
              >
                <MdManageHistory className="mr-2" />
                Manage History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
