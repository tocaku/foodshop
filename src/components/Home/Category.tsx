import React, { ReactNode, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import { useGetMenuListQuery } from "../../redux/features/food/foodApi";
import { IFood } from "../../types/globalType";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SamplePrevArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={`ml-[-20px] arrows ${className}`}>
      <i
        className="fa fa-angle-left"
        style={{ color: "white", fontSize: "30px" }}
      ></i>
    </div>
  );
};

const SampleNextArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={`mr-[-20px] arrows ${className}`}>
      <i
        className="fa fa-angle-right"
        style={{ color: "white", fontSize: "30px" }}
      ></i>
    </div>
  );
};

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3, // Default slidesToShow for large screens
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: ReactNode) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            color: "red",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
  };

  // Handle category selection
  const handleCategoryClick = (category: number) => {
    setSelectedCategory(category);
  };
  // Filter the menu based on the selected category
  // Fetch the menu list
  const { data, isLoading, error } = useGetMenuListQuery(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredMenu = data?.filter((menu: IFood) => {
    const matchesCategory =
      selectedCategory === 0 || menu.category === selectedCategory;
    const matchesSearch = menu.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categorize rendering logic
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
    } else if (!isLoading && filteredMenu?.length == 0) {
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
      let iter = 0;
      return (
        <Slider {...settings}>
          {filteredMenu?.map((menu: IFood) => (
            <Link key={menu.id} to={`/details/${menu.id}`}>
              <Fade
                cascade
                duration={1000}
                delay={(iter += 100)}
                direction="left"
              >
                <div className="px-5 pb-10">
                  <div className="border-2 border-[#f9f9f9] group card bg-base-100 shadow-xl rounded-none">
                    <figure>
                      <img
                        className="lg:w-full w-[60%]"
                        src={menu?.image}
                        alt={menu?.title}
                      />
                    </figure>
                    <div className="p-[32px] bg-[#f9f9f9] ">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-[20px] text-[#C00A27] mb-3">
                          {menu?.title}
                        </p>
                        <p className="badge badge-outline text-[#C00A27] border-2 font-semibold mb-3">
                          {menu?.category === 1
                            ? "Breakfast"
                            : menu?.category === 2
                            ? "Lunch"
                            : "Dinner"}
                        </p>
                      </div>
                      <p className="">
                        {menu?.description.split(" ").slice(0, 10).join(" ") +
                          (menu?.description.split(" ").length > 10
                            ? "..."
                            : "")}
                      </p>
                      <div className="flex justify-between items-center">
                        <StarRatings
                          rating={menu?.rating}
                          starRatedColor="#FFBA5A"
                          starDimension="20px"
                          starEmptyColor="#a9a9a9"
                          starSpacing="2px"
                          numberOfStars={5}
                          name="rating"
                        />
                        <p className="text-[15px] font-semibold text-[#7d7d7d] my-5">
                          {menu?.review_count} review
                          {menu?.review_count !== 1 && menu.review_count !== 0
                            ? "s"
                            : ""}
                        </p>
                      </div>
                      <div className="card-actions justify-center">
                        <div className="bg-[#C00A27] w-4 h-4 rotate-45 mb-[-18px]"></div>
                        <div className="bg-[#bcbaba] transition-all group-hover:bg-[#C00A27] w-full h-[1px]  "></div>
                      </div>
                      <div className="flex justify-center">
                        <p className="text-[20px] font-semibold text-[#7d7d7d] mt-5">
                          ${menu?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </Link>
          ))}
        </Slider>
      );
    }
  };
  let iters = 0;
  return (
    <div className="relative">
      <Fade cascade duration={1000} direction="up">
        <p className="mt-10 mb-6 text-center text-[#3a3a3a] text-[30px] font-bold">
          Our Menu
        </p>
      </Fade>
      <div className="w-[50%] mx-auto mb-16">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex justify-start w-[85%] mx-auto">
        {[0, 1, 2, 3].map((category) => (
          <Fade cascade duration={1000} delay={(iters += 200)}>
            <p
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`mr-4 px-3 py-2 mt-[-30px] rounded-md mb-[30px] font-semibold lg:text-[20px] md:text-[17px] text-[13px] cursor-pointer ${
                selectedCategory === category
                  ? "bg-yellow-300 text-gray-700"
                  : "bg-[#C00A27] hover:bg-yellow-300 hover:text-gray-700 text-white"
              }`}
            >
              {category === 0
                ? "All"
                : category === 1
                ? "Breakfast"
                : category === 2
                ? "Lunch"
                : "Dinner"}
            </p>
          </Fade>
        ))}
      </div>
      <div
        className="slider-container"
        style={{ width: "90%", margin: "auto" }} // Responsive container
      >
        {categorise()}
      </div>
    </div>
  );
};

export default Category;
