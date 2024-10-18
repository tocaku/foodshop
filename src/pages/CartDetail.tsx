import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useGetCuisineQuery,
  useGetOrderQuery,
  useGetUserAccountsListQuery,
  //   usePostCartMutation,
  usePostOrderMutation,
  useSingleMenuQuery,
  useSingleUserQuery,
  //   useUpdateCartMutation,
  useUpdateOrderMutation,
} from "../redux/features/food/foodApi";
// import { useAppSelector } from "../redux/hook";
// import {
//   setCurrentPageForNext,
//   setCurrentPageForPrevious,
// } from "../redux/features/food/foodSlice";
import { ICuisine, IOrder, IUser } from "../types/globalType";

const CartDetail = () => {
  const [postOrder, { isError: isErrorOrder, isLoading: isLoadingOrder }] =
    usePostOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteCart] = useDeleteCartMutation();
  //   const { currentPage } = useAppSelector((state) => state.food);
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

  const userToken = localStorage.getItem("token");
  const userId = filteredUser?.id;
  const navigate = useNavigate();
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
            quantity:
              existingOrder.quantity +
              cart?.find((crt: IOrder) => crt.menu === menu?.id)?.quantity,
            cost:
              existingOrder.cost +
              cart?.find((crt: IOrder) => crt.menu === menu?.id)?.cost,
          },
        };

        updateOrder(updatedOrder);
      } else {
        // If the order does not exist, create a new order
        console.log("object", menu.id);
        const options = {
          customer: parseInt(userId),
          menu: menu?.id,
          quantity: cart?.find((crt: IOrder) => crt.menu === menu?.id)
            ?.quantity,
          order_status: "Pending",
          cost: cart?.find((crt: IOrder) => crt.menu === menu?.id)?.cost,
        };
        console.log(options, menu.id);

        postOrder(options);
      }
      deleteCart(cart?.find((crt: IOrder) => crt.menu === menu?.id)?.id);
      navigate(`/details/${menu?.id}`, { replace: true });
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
        text: "There was an issue placing your order. Please try again.",
      });
    }
  };

  const { data: cuisineData } = useGetCuisineQuery(undefined);
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
                    {cart?.find((crt: IOrder) => crt.menu === menu?.id)?.cost ||
                      "Loading..."}
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
                    {/* <p className="inline mr-2 text-[18px] border-2 border-[#686464] rounded-sm px-3 font-semibold text-[#686464] mb-5">
                      Deshi
                    </p>
                    <p className="inline mr-2 text-[18px] border-2 border-[#686464] rounded-sm px-3 font-semibold text-[#686464] mb-5">
                      Deshi
                    </p> */}
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
                    <div className="border-2 hover:border border-[#686464] bg-[#715257] text-white rounded-none w-10 h-10 flex justify-center items-center font-extrabold hover:bg-[#715257] hover:text-white ">
                      -
                    </div>
                    <input
                      className="font-bold text-[#686464] pl-4 border-y-2 border-[#686464] rounded-none w-10 h-10"
                      type=""
                      name=""
                      id=""
                      value={
                        cart?.find((crt: IOrder) => crt.menu === menu?.id)
                          ?.quantity
                      }
                    />
                    <div className="border-2 hover:border border-[#686464] bg-[#715257] text-white rounded-none w-10 h-10 flex justify-center items-center font-extrabold hover:bg-[#715257] hover:text-white ">
                      +
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <p
                  onClick={handleOrder}
                  className="w-full bg-[#C00A27] text-white px-5 py-2 rounded-sm text-center"
                >
                  Order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartDetail;