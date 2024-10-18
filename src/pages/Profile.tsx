import { useParams } from "react-router-dom";
import {
  useGetMenuListQuery,
  useGetOrderQuery,
  useGetUserListQuery,
  useSingleUserAccountQuery,
  useUpdateAccountMutation,
  useUpdateOrderMutation,
} from "../redux/features/food/foodApi";
import { IAccount, IFood, IOrder } from "../types/globalType";
import Swal, { SweetAlertOptions } from "sweetalert2";

const Profile = () => {
  const [updateOrder] = useUpdateOrderMutation();
  const { id } = useParams();
  const [updateAccount, { error, isLoading }] =
    useUpdateAccountMutation(undefined);
  const {
    data: menuList,
    // isLoading: userLoading,
    // error: userError,
  } = useGetMenuListQuery(undefined);
  console.log(menuList);
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useSingleUserAccountQuery(id);
  const { data: usersData } = useGetUserListQuery(undefined);

  const filteredUser = usersData?.find((SingleUser: IAccount) => {
    return SingleUser?.username === userData?.user;
  });

  const handlePayment = (orderId: number, orderCost: number) => {
    const updatedOrder = {
      id: orderId,
      data: {
        is_paid: true,
      },
    };

    updateOrder(updatedOrder);
    const updatedAccount = {
      id: id,
      data: {
        amount: userData?.amount - orderCost,
      },
    };

    updateAccount(updatedAccount);
    Swal.fire({
      title: "Payment Successful!",
      icon: "success",
      confirmButtonText: "Close",
      confirmButtonColor: "#C00A27",
    });
  };

  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrderQuery(id);
  let totalOrderCost: number = 0;
  const notPaid = orderData?.filter((ord: IOrder) => {
    return ord?.is_paid === false;
  });
  console.log(notPaid);
  if (notPaid) {
    notPaid?.map((order: IOrder) => {
      totalOrderCost += order?.cost;
    });
    console.log(totalOrderCost);
  } else {
    totalOrderCost = 0;
  }

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
                  <th>Order Status</th>
                  <th>Order Time</th>
                  <th>Pay</th>
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
                    <th>
                      <button
                        className={`badge ${
                          order?.is_paid
                            ? "badge-success text-white"
                            : "badge-warning text-white"
                        } py-2`}
                      >
                        {order?.is_paid == false
                          ? order?.order_status
                          : "Completed"}
                      </button>
                    </th>
                    <td>{order?.created_on}</td>
                    <th>
                      <button
                        className={`badge ${
                          order?.is_paid
                            ? "badge-success text-white"
                            : "badge-warning text-white"
                        } py-2`}
                        disabled={order?.is_paid}
                        onClick={() =>
                          !order?.is_paid &&
                          handlePayment(order?.id, order?.cost)
                        }
                      >
                        {order.is_paid ? "Paid" : "Pay"}
                      </button>
                    </th>
                  </tr>
                ))}
                <tr className="text-[23px] md:block hidden">
                  <th colSpan={5} className="text-right">
                    Total Cost from Order:
                  </th>
                  <th>${totalOrderCost}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-[15px] text-center md:hidden block">
            <p className="text-right font-bold">
              Total Cost from Order: ${totalOrderCost}
            </p>
            {/* <th></th> */}
          </div>
        </div>
      );
    }
  };
  const categorise1 = () => {
    if (userLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    } else if (userError) {
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
    } else if (!userLoading && userData?.length === 0) {
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
        <div className="pt-4 w-full flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={userData?.image}
              alt="Profile Picture"
              className="border-[2px] shadow shadow-[#C00A27]  w-[150px] h-[150px] sm:w-[155px] sm:h-[155px] object-cover rounded-full mb-5 md:mb-0"
            />
            <p className="text-center text-[#5f5f5f] text-[20px] lg:text-[30px] mt-2 font-bold">
              {userData?.user}
            </p>
          </div>

          <div className="flex flex-col items-center justify-between">
            <p className="text-center text-[#363636] text-[40px] lg:text-[50px] mt-2 font-extrabold">
              ${userData?.amount}
            </p>

            <div
              onClick={() => handleTransaction("deposit")}
              className="font-bold bg-[white] shadow shadow-[#C00A27] text-black w-[100px] text-[15px] py-2 mt-3 rounded-md border-[2px]  text-center cursor-pointer"
            >
              Deposit
            </div>

            <div
              onClick={() => handleTransaction("withdraw")}
              className="font-bold bg-[white] text-black w-[100px] shadow shadow-[#C00A27] text-[15px] py-2 mt-3 rounded-md border-[2px]  text-center cursor-pointer"
            >
              Withdraw
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[18px] sm:text-[20px] text-black my-2">
              <span className="font-semibold">User Name:</span> {userData?.user}
            </p>
            <p className="text-[18px] sm:text-[20px] text-black my-2">
              <span className="font-semibold">Full Name:</span>{" "}
              {filteredUser?.first_name} {filteredUser?.last_name}
            </p>
            <p className="text-[18px] sm:text-[20px] text-black my-2">
              <span className="font-semibold">Email:</span>{" "}
              {filteredUser?.email}
            </p>
            <p className="text-[18px] sm:text-[20px] text-black my-2">
              <span className="font-semibold">Mobile No:</span>{" "}
              {userData?.mobile_no}
            </p>
            <p className="text-[18px] sm:text-[20px] text-black my-2">
              <span className="font-semibold">Address:</span>{" "}
              {userData?.address}
            </p>
          </div>
        </div>
      );
    }
  };
  const handleTransaction = async (type: "deposit" | "withdraw") => {
    const options: SweetAlertOptions = {
      title: `Enter amount to ${type}`,
      input: "number",
      inputAttributes: {
        min: "1",
        step: "1",
        placeholder: "Enter amount",
      },
      showCancelButton: true,
      confirmButtonColor: "#C00A27",
      confirmButtonText: type.charAt(0).toUpperCase() + type.slice(1),
      preConfirm: (amount) => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
          return Swal.showValidationMessage(`Please enter a valid amount`);
        }
        return amount;
      },
    };
    const { value: amount } = await Swal.fire(options);
    if (amount) {
      let newAmount = parseFloat(userData?.amount || "0");
      if (type === "deposit") {
        newAmount += parseFloat(amount);
      } else if (type === "withdraw") {
        if (parseFloat(amount) > newAmount) {
          return Swal.fire("Error", "Insufficient funds", "error");
        }
        newAmount -= parseFloat(amount);
      }
      const options = {
        id: id,
        data: {
          amount: newAmount,
        },
      };

      updateAccount(options);
      if (!error) {
        console.log("Updated Account");
        Swal.fire({
          title: "Success",
          text: `Your account has been ${
            type === "deposit" ? "credited" : "debited"
          } with $${amount}. New balance: $${newAmount}.`,
          icon: "success",
          confirmButtonColor: "#C00A27",
        });
      } else if (!isLoading && error) {
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Oops!",
          confirmButtonColor: "#C00A27",
        });
      }
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
            Profile
          </p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Profile
          </p>
        </div>
      </div>
      {/* Hero section and Profile UI */}
      <div className="relative bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/bg-img-1_1.png?v=1614334735&width=1920)] bg-no-repeat bg-cover">
        <div className="w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto rounded-md shadow-2xl flex-col justify-center items-center py-4 px-5 sm:px-10 bg-white">
          <div className="mb-10 xl:w-[80%] lg:w-[80%] w-full mx-auto flex-col items-center justify-center">
            {categorise1()}
            <div className="w-full flex flex-col md:flex-row justify-between items-center"></div>
          </div>
          <div className="divider" />
          {/* Order History Table */}
          <p className="mt-10 mb-6 text-center text-[#3a3a3a] text-[24px] sm:text-[30px] font-bold">
            Order History
          </p>
          {categorise()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
