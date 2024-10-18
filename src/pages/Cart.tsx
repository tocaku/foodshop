import { Link } from "react-router-dom";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useGetMenuListQuery,
  useGetUserAccountsListQuery,
  useSingleUserQuery,
} from "../redux/features/food/foodApi";
import { ICart, IFood, IOrder, IUser } from "../types/globalType";
import Swal from "sweetalert2";

const Cart = () => {
  const {
    data: menuList,
    // isLoading: userLoading,
    // error: userError,
  } = useGetMenuListQuery(undefined);
  console.log(menuList);

  const userId = localStorage.getItem("user_id"); // Check if user is logged in

  const {
    data: user,
    // isLoading: isLoadingUser,
    // error: errorUser,
  } = useSingleUserQuery(userId);
  const {
    data: userList,
    // isLoading: isLoadingUser,
    // error: errorUser,
  } = useGetUserAccountsListQuery(undefined);
  console.log(userId);
  const filteredUser = userList?.find((SingleUser: IUser) => {
    return SingleUser?.user === user?.username;
  });
  console.log(filteredUser);
  const id = filteredUser?.id;
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useGetCartQuery(id);
  const [deleteCart] = useDeleteCartMutation();
  let total = 0;
  if (orderData?.length > 0) {
    orderData?.map((order: IOrder) => {
      total += order?.cost;
    });
  }
  console.log(total);
  const handleDelete = (cartId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C00A27",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the deletion
        // const options = {
        //   id: id,
        // };
        deleteCart(cartId);
        // navigate("/all-books");
        Swal.fire({
          title: "Cart Item Deleted Successfully!",
          icon: "success",
          confirmButtonText: "Cool!",
          confirmButtonColor: "#C00A27",
        });
      }
    });
  };

  const categorise = () => {
    if (orderLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    } else if (orderError) {
      return (
        <div className="my-[200px]">
          <p className="text-red-500 text-lg text-center font-extrabold">
            No User Found!
          </p>
        </div>
      );
    } else if (!orderLoading && orderData?.length === 0) {
      return (
        <div className="my-[100px] flex flex-col justify-center items-center">
          <img
            src="https://ph-tube.netlify.app/images/Icon.png"
            alt=""
            className="mb-5"
          />
          <p className="text-red-500 text-lg text-center font-extrabold">
            No Items Available!
          </p>
        </div>
      );
    } else {
      return (
        <div className="my-5">
          <div className="overflow-x-auto">
            <table className="w-[70%] mx-auto table">
              {/* head */}
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((order: ICart) => (
                  <tr key={order?.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-36 w-36">
                            <img
                              src={
                                menuList?.find(
                                  (men: IFood) => men.id === order.menu
                                )?.image ||
                                "https://i.pinimg.com/originals/2e/ce/ce/2ececec5431d0a1b7eae4e1acac7c59f.gif"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold mb-3 text-[20px]">
                            {menuList?.find(
                              (men: IFood) => men.id === order.menu
                            )?.title || "Loading..."}
                          </div>
                          <div className="text-[16px] opacity-50">
                            $
                            {menuList?.find(
                              (men: IFood) => men.id === order.menu
                            )?.price || "Loading..."}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{order?.quantity}</td>
                    <td>{order?.cost}</td>
                    <th>
                      <Link
                        to={`/cart_detail/${
                          menuList?.find((men: IFood) => men.id === order.menu)
                            ?.id
                        }`}
                        className="badge badge-[#C00A27] badge-outline py-2"
                      >
                        Detail
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(order?.id)}
                        className="badge badge-error text-white py-2"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
                <tr className="text-[23px]">
                  <th colSpan={4} className="text-right">
                    Total Cost from Cart:
                  </th>
                  <th>${total}</th>
                </tr>
              </tbody>
            </table>
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
          <p className="text-[36px] font-bold text-white text-center">Cart</p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Cart
          </p>
        </div>
      </div>
      <p className="mt-10 mb-6 text-center text-[#3a3a3a] text-[24px] sm:text-[30px] font-bold">
        Cart
      </p>
      {categorise()}
    </div>
  );
};

export default Cart;
