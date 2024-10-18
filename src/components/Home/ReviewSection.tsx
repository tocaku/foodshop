// import { ReactNode } from "react";
import { GoPerson } from "react-icons/go";
import bg from "../../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.webp";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import Slider from "react-slick";
import { ReactNode } from "react";
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import {
  useGetMenuListQuery,
  useGetReviewListQuery,
  useGetUserAccountsListQuery,
  useGetUserListQuery,
} from "../../redux/features/food/foodApi";
import { IAccount, IFood, IReview, IUser } from "../../types/globalType";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
// Define the Arrow component with responsive styles
const SamplePrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({
    top: "50%",
    left: "-10%",
    fontSize: "30px",
  });

  // Handle window resizing to apply responsive styles
  useEffect(() => {
    const updateArrowStyle = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "20px",
          left: "-10%", // Adjust for smaller screens
        });
      } else if (width <= 1024) {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "25px",
          left: "-9%",
        });
      } else {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "30px",
          left: "-8%",
        });
      }
    };

    window.addEventListener("resize", updateArrowStyle);
    updateArrowStyle(); // Initial style setting

    return () => window.removeEventListener("resize", updateArrowStyle);
  }, [arrowStyle]);

  return (
    <div
      style={{
        ...style,
        ...arrowStyle,
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
      className={`arrows ${className} `}
    >
      <i className="fa fa-angle-left" style={{ color: "white" }}></i>
    </div>
  );
};

const SampleNextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({
    top: "50%",
    left: "105%",
    fontSize: "30px",
  });

  useEffect(() => {
    const updateArrowStyle = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "20px",
          left: "100%", // Adjust for smaller screens
        });
      } else if (width <= 1024) {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "25px",
          left: "102%",
        });
      } else {
        setArrowStyle({
          ...arrowStyle,
          fontSize: "30px",
          left: "104%",
        });
      }
    };

    window.addEventListener("resize", updateArrowStyle);
    updateArrowStyle(); // Initial style setting

    return () => window.removeEventListener("resize", updateArrowStyle);
  }, [arrowStyle]);

  return (
    <div
      style={{
        ...style,
        ...arrowStyle,
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
      className={`arrows ${className} `}
    >
      <i className="fa fa-angle-right" style={{ color: "white" }}></i>
    </div>
  );
};
const ReviewSection = () => {
  const settings = {
    ClassNames: "center",
    dots: true,
    infinite: true,
    slidesToShow: 1, // Default slidesToShow for large screens
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    appendDots: (dots: ReactNode) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "none",
            justifyContent: "center",
            color: "red",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
  };
  const { data: reviews, isLoading, error } = useGetReviewListQuery(undefined);
  const { data: menuList } = useGetMenuListQuery(undefined);
  const { data: users } = useGetUserListQuery(undefined);
  const { data: accounts } = useGetUserAccountsListQuery(undefined);
  const categorise = () => {
    if (isLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    } else if (error) {
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
    } else if (!isLoading && reviews?.length == 0) {
      return (
        <>
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
        </>
      );
    } else {
      // let iter = 0;
      return (
        <Slider className="mx-auto w-[70%] overflow" {...settings}>
          {reviews?.map((review: IReview) => {
            const matchedMenu = menuList?.find((menu: IFood) => {
              return menu?.id === review?.menu;
            });
            const matchedUser = users?.find((use: IAccount) => {
              return review?.reviewer === use?.id;
            });
            const matchedAccount = accounts?.find((account: IUser) => {
              return account?.user === matchedUser?.username;
            });

            return (
              <div key={review?.id} className="w-full">
                <div className="lg:w-[60%] w-[90%] mx-auto bg-white group my-10 py-10 relative flex flex-col justify-center items-center">
                  <div className="group-hover:border-[#C00A27] border-[#3A3A3A] border-[5px] w-[90%] flex flex-col justify-center items-center">
                    <p className="bg-white group-hover:text-[#3A3A3A] text-[#C00A27] font-extrabold text-[60px] absolute top-0 left-0 p-3">
                      <RiDoubleQuotesL />
                    </p>
                    <p className="bg-white group-hover:text-[#3A3A3A] text-[#C00A27] font-extrabold text-[60px] absolute bottom-0 right-0 p-3">
                      <RiDoubleQuotesR />
                    </p>
                    <div className="flex justify-between items-center flex-wrap">
                      <img
                        className="lg:w-[35%] md:[70%] sm:w-[70%] w-[60%] mx-auto"
                        src={
                          matchedMenu?.image ||
                          "https://i.pinimg.com/originals/2e/ce/ce/2ececec5431d0a1b7eae4e1acac7c59f.gif"
                        }
                        alt=""
                      />
                      <div className="lg:w-[65%] w-full">
                        <div className="w-[80%] mx-auto my-10">
                          <div className="mt-5 flex justify-start items-center mb-5 md:mb-0">
                            {matchedAccount ? (
                              <img
                                className="lg:w-[70px] lg:h-[70px] md:w-[70px] md:h-[70px] sm:w-[70px] sm:h-[70px] w-[40px] h-[40px] mr-1 md:mr-3 rounded-full"
                                src={matchedAccount?.image}
                                alt=""
                              />
                            ) : (
                              <GoPerson className="bg-[#8d8b8b] p-1 rounded-full text-yellow-400 mr-3 md:mr-3 text-[70px] md:text-[70px]" />
                            )}
                            <div className="flex-col justify-start items-start">
                              <p className="text-[#686464] font-bold text-[18px] md:text-[20px]">
                                {matchedUser?.username || "User Name"}
                              </p>

                              <StarRatings
                                rating={review?.rating}
                                starRatedColor="#FFBA5A"
                                starDimension="20px"
                                starEmptyColor="#a9a9a9"
                                starSpacing="2px"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                          </div>
                          <p className="text-[20px] text-left font-bold group-hover:text-[#3A3A3A] text-[#C00A27] mt-5">
                            {matchedMenu?.title || "Loading..."}
                          </p>
                          <p className="text-[20px] mb-1 font-semibold text-[#3A3A3A] mt-1">
                            {review?.title}
                          </p>
                          <p
                            style={{ overflowWrap: "break-word" }}
                            className="text-[#3A3A3A] w-full"
                          >
                            {review?.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      );
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-fixed w-full mt-10"
    >
      <div className="w-full bg-black bg-opacity-50">
        <Fade cascade direction="up" duration={1000}>
          <p className="pt-10 mb-6 text-center text-white text-[30px] sm:text-[30px] font-bold">
            Our Clients Reviews
          </p>
        </Fade>
        <Fade cascade direction="up" duration={1000} delay={200}>
          <p className="text-center text-white font-semibold text-[20px]">
            Odio morbi quis commodo odio aenean sed adipiscing. Neque ornare
            aenean{" "}
          </p>
        </Fade>
        <Fade cascade direction="up" duration={1000} delay={400}>
          <p className="mb-16 text-center text-white font-semibold text-[20px] ">
            euismod elementum nisi quis.
          </p>
        </Fade>
        {categorise()}
      </div>
    </div>
  );
};

export default ReviewSection;
