import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SamplePrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        top: "50%",
        left: "10px",
        zIndex: "30",
      }}
      className={`ml-[-20px] arrows ${className}`}
    >
      <i
        className="fa fa-angle-left"
        style={{ color: "white", fontSize: "30px" }}
      ></i>
    </div>
  );
};

const SampleNextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        top: "50%",
        right: "0%",
        zIndex: "30",
        padding: "2px",
      }}
      className={`mr-[-20px] arrows ${className}`}
    >
      <i
        className="fa fa-angle-right"
        style={{ color: "white", fontSize: "30px" }}
      ></i>
    </div>
  );
};

const Client = () => {
  const settings = {
    dots: false, // Disable default dots
    infinite: true,
    slidesToShow: 5, // Default slidesToShow for large screens
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // beforeChange: (oldIndex: number, newIndex: number) => {
    //   setCurrentSlide(newIndex % 2); // Only toggle between 0 and 1 (for two dots)
    // },
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
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
  };

  return (
    <div className="mb-10 w-[70%] mx-auto overflow-hidden">
      <Fade cascade direction="up" duration={1000}>
        <p className="mt-10 mb-6 text-center text-[#3a3a3a] text-[24px] sm:text-[30px] font-bold">
          Our Client
        </p>
      </Fade>
      <Slider className="" {...settings}>
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-8_1.png?v=1614334735&width=1500"
          alt=""
        />
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-3.png?v=1614334586&width=1500"
          alt=""
        />
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-4.png?v=1614334586&width=1500"
          alt=""
        />
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-7_1.png?v=1614334735&width=1500"
          alt=""
        />
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-6_1.png?v=1614334735&width=1500"
          alt=""
        />
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/client-1.png?v=1614334586&width=1500"
          alt=""
        />
      </Slider>
    </div>
  );
};

export default Client;
