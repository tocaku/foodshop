import { useParams } from "react-router-dom";
import {
  useGetCartQuery,
  useGetCuisineQuery,
  useGetOrderQuery,
  useGetUserAccountsListQuery,
  // usePostCartMutation,
  usePostOrderMutation,
  useSingleMenuQuery,
  useSingleUserQuery,
  // useUpdateCartMutation,
  useUpdateOrderMutation,
} from "../redux/features/food/foodApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { ICuisine, IOrder, IUser } from "../types/globalType";
import {
  setCurrentPageForNext,
  setCurrentPageForPrevious,
} from "../redux/features/food/foodSlice";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import { useState } from "react";

const Discounted = () => {
  const [couponCode, setCouponCode] = useState("");
  // const [postCart, { isError: isErrorCart, isLoading: isLoadingCart }] =
  // usePostCartMutation();
  const [postOrder, { isError: isErrorOrder, isLoading: isLoadingOrder }] =
    usePostOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  // const [updateCart] = useUpdateCartMutation();
  const { currentPage, currentCost } = useAppSelector((state) => state.food);
  const { id } = useParams();
  const userID = localStorage.getItem("user_id");

  const {
    data: user,
    // isLoading: isLoadingUser,
    // error: errorUser,
  } = useSingleUserQuery(userID);
  const {
    data: userList,
    // isLoading: isLoadingUser,
    // error: errorUser,
  } = useGetUserAccountsListQuery(undefined);
  const filteredUser = userList?.find((SingleUser: IUser) => {
    return SingleUser?.user === user?.username;
  });
  const { data: orders } = useGetOrderQuery(filteredUser?.id); // Fetch existing orders
  const { data: cart } = useGetCartQuery(filteredUser?.id); // Fetch existing orders
  const {
    data: menu,
    isLoading: isLoadingMenu,
    error: errorMenu,
  } = useSingleMenuQuery(id);

  let totalOrderCosts: number = 0;
  const notPaid = orders?.filter((order: IOrder) => order?.is_paid === false);
  if (notPaid?.length > 0) {
    notPaid?.map((order: IOrder) => (totalOrderCosts += order?.cost));
  }
  let totalCartCosts: number = 0;
  if (cart?.length > 0) {
    cart?.map((crt: IOrder) => (totalCartCosts += crt?.cost));
  }
  const totalCost = totalCartCosts + totalOrderCosts;

  const dispatch = useAppDispatch();

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPageForPrevious(menu?.price));
    }
  };

  const handleNextPage = () => {
    if (
      filteredUser?.amount >=
      currentCost - currentCost * (menu?.discount / 100) + totalCost
    ) {
      dispatch(setCurrentPageForNext(menu?.price));
    }
  };

  const userToken = localStorage.getItem("token");
  const userId = filteredUser?.id;
  // const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCouponCode(e.target.value);
  // };
  const handleOrder = async () => {
    if (userToken && userId && menu) {
      const existingOrder = orders?.find(
        (order: IOrder) => order.customer === userId && order.menu === menu.id
      );
      console.log(existingOrder);
      if (existingOrder) {
        // If the order exists, update the quantity
        const updatedOrder = {
          id: existingOrder?.id,
          data: {
            quantity: existingOrder.quantity + currentPage,
            cost:
              existingOrder.cost +
              currentCost -
              currentCost * (menu?.discount / 100),
          },
        };

        updateOrder(updatedOrder);
      } else {
        // If the order does not exist, create a new order
        console.log("object", menu.id);
        const options = {
          customer: parseInt(userId),
          menu: menu?.id,
          quantity: currentPage,
          order_status: "Pending",
          cost: currentCost - currentCost * (menu?.discount / 100),
        };
        console.log(options, menu.id);

        postOrder(options);
      }

      if (isErrorOrder && !isLoadingOrder) {
        Swal.fire({
          icon: "error",
          title: "Order Failed!",
          text: "There was an issue placing your order. Please try again.",
        });
      } else if (isLoadingOrder) {
        console.log("loading order");
      } else if (!isErrorOrder && !isLoadingOrder) {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been successfully placed.",
        });
      }
    } else if (!userId && !userToken) {
      Swal.fire({
        icon: "error",
        title: "Order Failed!",
        text: "You are not logged in. Please try again.",
      });
    }
  };
  // const handleCart = async () => {
  //   if (userToken && userId && menu) {
  //     const existingCart = cart?.find(
  //       (crt: IOrder) => crt.customer === userId && crt.menu === menu.id
  //     );
  //     console.log(existingCart);
  //     if (existingCart) {
  //       // If the order exists, update the quantity
  //       const updatedCart = {
  //         id: existingCart?.id,
  //         data: {
  //           quantity: existingCart.quantity + currentPage,
  //           cost:
  //             existingCart.cost +
  //             currentCost -
  //             currentCost * (menu?.discount / 100),
  //         },
  //       };

  //       updateCart(updatedCart);
  //     } else {
  //       // If the Cart does not exist, create a new Cart
  //       console.log("object", menu.id);
  //       const options = {
  //         customer: parseInt(userId),
  //         menu: menu?.id,
  //         quantity: currentPage,
  //         cost: currentCost - currentCost * (menu?.discount / 100),
  //       };
  //       console.log(options, menu.id);

  //       postCart(options);
  //     }

  //     if (isLoadingCart) {
  //       console.log("loading");
  //     } else if (!isLoadingCart && !isErrorCart) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Cart Placed!",
  //         text: "Your order has been successfully placed.",
  //       });
  //     } else {
  //       console.log("error");
  //     }
  //   } else if (!userId && !userToken) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Cart Failed!",
  //       text: "There was an issue placing your order. Please try again.",
  //     });
  //   }
  // };
  const { data: cuisineData } = useGetCuisineQuery(undefined);
  const categorise = () => {
    if (isLoadingMenu) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    } else if (errorMenu) {
      return (
        <div className="my-[100px] flex flex-col justify-center items-center">
          <img
            src="https://ph-tube.netlify.app/images/Icon.png"
            alt=""
            className="mb-5"
          />
          <p className="text-red-500 text-lg text-center font-extrabold">
            Something Went Wrong!
          </p>
        </div>
      );
    } else {
      return (
        <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex justify-center w-full md:w-1/2">
              <img className="w-full md:w-[70%]" src={menu?.image} alt="" />
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="md:w-[60%]">
                <p className="text-[24px] md:text-[36px] font-bold text-[#686464] mb-5">
                  {menu?.title}
                </p>
                <p className="text-[16px] md:text-[18px] text-[#686464] mb-3">
                  {menu?.description}
                </p>
                <div className="mb-5">
                  <StarRatings
                    rating={menu?.rating}
                    starRatedColor="#FFBA5A"
                    starDimension="30px"
                    starEmptyColor="#a9a9a9"
                    starSpacing="3px"
                    numberOfStars={5}
                    name="rating"
                  />
                  <p className="text-[#686464] ml-5 text-[16px] inline-block font-bold">
                    {" "}
                    {menu?.review_count} review
                    {menu?.review_count !== 1 && menu.review_count !== 0
                      ? "s"
                      : ""}
                  </p>
                </div>
                <div className="flex justify-start">
                  <div className="w-[35%]">
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Price :
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Discount :
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Total Cost :
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Cuisine :
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Type :
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      Quantity :
                    </p>
                  </div>
                  <div className="w-[65%]">
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      ${menu?.price}
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      {menu?.discount}%
                    </p>
                    <p className="text-[20px] font-semibold text-[#686464] mb-5">
                      {currentCost - currentCost * (menu?.discount / 100) > 0
                        ? currentCost - currentCost * (menu?.discount / 100)
                        : 0}
                    </p>
                    <div className="mb-5">
                      {cuisineData
                        ?.filter((csns: ICuisine) =>
                          menu?.cuisine.includes(csns?.id)
                        )
                        .map((csn: ICuisine) => {
                          return (
                            <p
                              key={csn?.id}
                              className="inline mr-2 text-[18px] border-2 border-[#686464] rounded-sm px-3 font-semibold text-[#686464] mb-5"
                            >
                              {csn?.name || "Loading..."}
                            </p>
                          );
                        })}
                      ;
                    </div>
                    <div className="mb-5">
                      <p className="inline text-[18px] border-2 border-[#686464] rounded-sm px-3 font-semibold text-[#686464] mb-5">
                        {menu?.category === 1
                          ? "Breakfast"
                          : menu?.category === 2
                          ? "Lunch"
                          : "Dinner"}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <div
                        onClick={handlePreviousPage}
                        className={
                          currentPage > 0
                            ? "border-2 hover:border border-[#686464] rounded-none w-10 h-10 flex justify-center items-center font-bold hover:bg-[#C00A27] hover:text-white text-[#686464]"
                            : "border-2 hover:border border-[#686464] bg-[#715257] text-white rounded-none w-10 h-10 flex justify-center items-center font-extrabold hover:bg-[#715257] hover:text-white "
                        }
                      >
                        -
                      </div>
                      <input
                        className="font-bold text-[#686464] pl-4 border-y-2 border-[#686464] rounded-none w-10 h-10"
                        type=""
                        name=""
                        id=""
                        value={currentPage}
                      />
                      <div
                        onClick={handleNextPage}
                        className={
                          filteredUser?.amount >=
                          currentCost -
                            currentCost * (menu?.discount / 100) +
                            totalCost
                            ? "border-2 hover:border border-[#686464] rounded-none w-10 h-10 flex justify-center items-center font-bold hover:bg-[#C00A27] hover:text-white text-[#686464]"
                            : "border-2 hover:border border-[#686464] bg-[#715257] text-white rounded-none w-10 h-10 flex justify-center items-center font-extrabold hover:bg-[#715257] hover:text-white "
                        }
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>

                <label className="form-control w-full my-3 md:my-5">
                  <input
                    required
                    type="text"
                    placeholder="Type Your Coupon Code"
                    id="title"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <div className="flex justify-center">
                  <p
                    onClick={
                      filteredUser?.amount >=
                        currentCost -
                          currentCost * (menu?.discount / 100) +
                          totalCost && couponCode === "yummi"
                        ? handleOrder
                        : undefined
                    }
                    className={
                      filteredUser?.amount >=
                        currentCost -
                          currentCost * (menu?.discount / 100) +
                          totalCost &&
                      currentPage > 0 &&
                      couponCode === "yummi"
                        ? "w-full bg-[#C00A27] text-white px-5 py-2 rounded-sm text-center mb-3"
                        : "w-full bg-[#715257] text-white px-5 py-2 rounded-sm text-center mb-3"
                    }
                  >
                    {filteredUser?.amount >=
                    currentCost -
                      currentCost * (menu?.discount / 100) +
                      totalCost
                      ? currentPage > 0
                        ? couponCode === "yummi"
                          ? "Order"
                          : "Enter Correct Coupon Code"
                        : "Add Quantity"
                      : "Insufficient Account Balance"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div
        style={{ backgroundPosition: "100% 8%" }}
        className="hero bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320&width=1920)] bg-no-repeat bg-cover"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content py-10 flex-col">
          <p className="text-[36px] font-bold text-white text-center">
            Discounts
          </p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Discounts
          </p>
        </div>
      </div>
      {categorise()}
    </div>
  );
};

export default Discounted;
