import Swal from "sweetalert2";
import {
  useDeleteOrderMutation,
  useGetMenuListQuery,
  useGetOrderListQuery,
  // useGetOrderQuery,
  useGetUserAccountsListQuery,
  // useSingleUserQuery,
  useUpdateOrderMutation,
} from "../../redux/features/food/foodApi";
import { IFood, IOrder, IUSER } from "../../types/globalType";

const ManageHistory = () => {
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  // const userId = localStorage.getItem("user_id"); // Check if user is logged in
  // const { data: singleUser } = useSingleUserQuery(userId);
  const { data: userAccountsData } = useGetUserAccountsListQuery(undefined);
  // const filteredUserAccount = userAccountsData?.find(
  //   (SingleUserAccount: IUSER) => {
  //     return SingleUserAccount?.user === singleUser?.username;
  //   }
  // );
  const handleDelete = (orderId: number) => {
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
        deleteOrder(orderId);
        // navigate("/all-books");
        Swal.fire({
          title: "Order Deleted Successfully!",
          icon: "success",
          confirmButtonText: "Cool!",
          confirmButtonColor: "#C00A27",
        });
      }
    });
  };
  // const handleDD = (order: IOrder) => {
  //   const kk = userAccountsData?.find((acnt: IUSER) => {
  //     return order?.customer === acnt?.id;
  //   });
  //   console.log(kk?.user);
  // };
  const handleDelivery = (id: number) => {
    const updatedOrder = {
      id: id,
      data: {
        order_status: "Delivering",
      },
    };

    updateOrder(updatedOrder);
    Swal.fire({
      title: "An Email Has Been Sent To Customer!",
      icon: "success",
      confirmButtonText: "Close",
    });
  };
  const {
    data: menuList,
    // isLoading: userLoading,
    // error: userError,
  } = useGetMenuListQuery(undefined);
  console.log(menuList);

  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrderListQuery(undefined);

  const categorise = () => {
    if (orderLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    } else if (orderError) {
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
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Customer Name</th>
                  <th>Order Time</th>
                  <th>Delivering Status</th>
                  <th>Paying Status</th>
                  <th>Deliver</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((order: IOrder) => (
                  <tr key={order?.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
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
                          <div className="font-bold">
                            {menuList?.find(
                              (men: IFood) => men.id === order.menu
                            )?.title || "Loading..."}
                          </div>
                          <div className="text-sm opacity-50">
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
                    <td>
                      {userAccountsData?.find((acnt: IUSER) => {
                        return order?.customer === acnt?.id;
                      })?.user || "Loading..."}
                    </td>
                    <td>{order?.created_on}</td>
                    <th>
                      <button className="badge badge-outline py-2">
                        {order?.is_paid ? "Completed" : order?.order_status}
                      </button>
                    </th>
                    <th>
                      <button className="badge badge-outline py-2">
                        {order?.is_paid ? "Paid" : "Unpaid"}
                      </button>
                    </th>
                    <th>
                      <button
                        className={`badge ${
                          order?.order_status === "Delivering"
                            ? "badge-success text-white"
                            : "badge-success badge-outline"
                        } py-2`}
                        disabled={order?.order_status === "Delivering"}
                        onClick={() =>
                          !(order?.order_status === "Delivering") &&
                          handleDelivery(order?.id)
                        }
                      >
                        {order.order_status === "Delivering"
                          ? "Delivered"
                          : "Deliver"}
                      </button>
                    </th>
                    <th>
                      <button
                        className="badge badge-error badge-outline"
                        onClick={() => handleDelete(order?.id)}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="w-full h-full bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/bg-img-1_1.png?v=1614334735&width=1920)] bg-contain flex-col items-center">
      {/* Hero section and Profile UI */}
      <div className="">
        <div className="w-[90%] mt-10 md:w-[90%] lg:w-[90%] xl:w-[90%] mx-auto rounded-md shadow-2xl flex-col justify-center items-start py-4 px-5 sm:px-10 bg-white">
          <p className="mt-6 mb-6 text-center text-[#3a3a3a] text-[24px] sm:text-[30px] font-bold">
            Order History
          </p>
          {categorise()}
        </div>
      </div>
    </div>
  );
};

export default ManageHistory;
