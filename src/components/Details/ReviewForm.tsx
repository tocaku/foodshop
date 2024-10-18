import { useState } from "react";
import StarRating from "./StarRating";
import {
  // useGetMenuListQuery,
  useGetOrderQuery,
  useGetUserAccountsListQuery,
  usePostReviewMutation,
  useSingleMenuQuery,
  useSingleUserQuery,
  // useSingleMenuQuery,
} from "../../redux/features/food/foodApi";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IOrder, IUSER } from "../../types/globalType";

const getValue = (id: string): string => {
  const element = document.getElementById(id) as HTMLInputElement | null;
  return element ? element.value : "";
};

const ReviewForm = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [postReview, { isError, isSuccess, isLoading }] =
    usePostReviewMutation();
  console.log(isSuccess, isError);

  const { id } = useParams<{ id: string }>();

  const userId = parseInt(localStorage.getItem("user_id")!);
  const {
    data: userData,
    // isLoading: userLoading,
    // error: userError,
  } = useSingleUserQuery(userId);
  const { data: userAccountsData } = useGetUserAccountsListQuery(undefined);

  const filteredUserAccount = userAccountsData?.find(
    (SingleUserAccount: IUSER) => {
      return SingleUserAccount?.user === userData?.username;
    }
  );

  const { data: order } = useGetOrderQuery(filteredUserAccount?.id);
  const { data: menu } = useSingleMenuQuery(id);
  const filteredOrder = order?.find((ord: IOrder) => {
    return ord?.menu === menu?.id;
  });
  console.log(menu);

  const handleReview = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const title = getValue("review_title");
    const body = getValue("review_body");

    if (!id || !title || !body) {
      console.error("Missing ID, title, or body.");
      return;
    }

    if (currentValue === 0) {
      Swal.fire({
        title: "Rating is required!",
        text: "Please select a rating before submitting.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#C00A27",
      });
      return;
    }
    const _id = parseInt(localStorage.getItem("user_id")!);
    const options = {
      id: id,
      data: {
        title,
        body,
        reviewer: _id,
        menu: parseInt(id),
        rating: currentValue,
      },
    };
    if (!isLoading && _id) {
      postReview(options);
      // Clear form inputs
      (document.getElementById("review_title") as HTMLInputElement).value = "";
      (document.getElementById("review_body") as HTMLInputElement).value = "";

      Swal.fire({
        title: "Review Added Successfully!",
        icon: "success",
        confirmButtonText: "OK!",
        confirmButtonColor: "#C00A27",
      });
    } else if (!isLoading && !_id) {
      Swal.fire({
        title: "You are not registered!",
        icon: "error",
        confirmButtonText: "OK!",
        confirmButtonColor: "#C00A27",
      });
    }
  };
  console.log(filteredOrder);
  return (
    <div className="lg:w-[50%] md:w-1/2 w-[80%] mx-auto flex-col justify-normal items-center">
      <p className="lg:text-[36px] md:text-[36px] text-[20px] font-bold text-[#686464] mb-5 text-center mt-10">
        Give Your Review And Ratings
      </p>
      <form onSubmit={handleReview}>
        <p className="text-[16px] font-bold text-[#686464] mb-5 text-center">
          Give Ratings
        </p>
        <StarRating
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
        <input
          type="text"
          placeholder="Title"
          id="review_title"
          className="input input-bordered rounded-sm w-full block my-10"
        />
        <input
          type="text"
          placeholder="Description"
          id="review_body"
          className="input input-bordered rounded-sm w-full block"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className={
              filteredOrder?.is_paid === true
                ? "w-1/3 my-5 bg-[#C00A27] text-white px-5 py-2 rounded-sm text-center"
                : "w-1/3 my-5 bg-[#715257] text-white px-5 py-2 rounded-sm text-center"
            }
            disabled={!filteredOrder?.is_paid}
          >
            {filteredOrder?.is_paid ? "Review" : "Review After Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
