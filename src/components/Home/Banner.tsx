import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
const Banner = () => {
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
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <div>
      <div className="w-full">
        {/* Slide 1 */}
        <Slider {...settings}>
          <div id="slide1" className="carousel-item relative w-full">
            <div
              className="hero h-[50vh] sm:h-[75vh] lg:h-screen"
              style={{
                backgroundImage:
                  "url(https://yummi-theme.myshopify.com/cdn/shop/files/slide1-bg.jpg?v=1614338364)",
              }}
            >
              <div className="ml-0 lg:ml-20 text-left text-white">
                <div className="lg:w-1/2 md:w-2/3 w-[65%] px-9  lg:px-0">
                  <Fade cascade direction="up" duration={1000}>
                    <h1 className="mb-5 text-3xl md:text-5xl font-bold text-[#f4b618]">
                      Welcome to Yummi
                    </h1>
                  </Fade>
                  <Fade cascade direction="up" delay={500} duration={1000}>
                    <p className="mb-5 text-md md:text-lg">
                      Discover the finest selection of gourmet foods, curated
                      just for you. Indulge in a world of flavors and enjoy a
                      dining experience like no other.
                    </p>
                  </Fade>
                  <Fade cascade direction="up" delay={1000} duration={1000}>
                    <button className="btn bg-[#f4b618] text-black">
                      Explore Now
                    </button>
                  </Fade>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <div
              className="hero h-[50vh] sm:h-[75vh] lg:h-screen"
              style={{
                backgroundImage:
                  "url(https://yummi-theme.myshopify.com/cdn/shop/files/slide2-bg.jpg?v=1614338365)",
              }}
            >
              <div className="hero-overlay bg-opacity-40"></div>
              <div className="text-center text-white">
                <div className=" w-[80%] mx-auto px-8">
                  <Fade cascade direction="up" delay={1000} duration={1000}>
                    <h1 className="mb-5 text-xl md:text-5xl font-bold text-[#f4b618]">
                      Gourmet Delights
                    </h1>
                  </Fade>
                  <Fade cascade direction="up" delay={500} duration={1000}>
                    <p className="mb-5 text-sm md:text-lg">
                      Our chefs are passionate about bringing you the finest
                      culinary creations. Enjoy a symphony of tastes with every
                      bite.
                    </p>
                  </Fade>
                  <Fade cascade direction="up" duration={1000}>
                    <button className="btn bg-[#f4b618] text-black">
                      Order Now
                    </button>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
