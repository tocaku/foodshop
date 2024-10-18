import { useNavigate } from "react-router-dom";
import { useGetMenuListQuery } from "../../redux/features/food/foodApi";
import { IFood } from "../../types/globalType";
import { Slide, Fade } from "react-awesome-reveal";

const MenuComponent = () => {
  const { data, isLoading, error } = useGetMenuListQuery(undefined);
  const filteredMenu = data?.filter((menu: IFood) => menu?.discount > 0);
  const navigate = useNavigate();
  const handleDiscount = (id: number) => {
    navigate(`/discounted/${id}`, { replace: true });
  };
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
    } else if (!isLoading && data?.length == 0) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-16 md:px-28 overflow-hidden">
          {filteredMenu?.map((menu: IFood) => (
            <div
              key={menu?.id}
              className="group"
              onClick={() => handleDiscount(menu?.id)}
            >
              <Slide
                cascade
                direction={iter % 2 === 0 ? "left" : "right"}
                delay={(iter += 101)}
                duration={1000}
              >
                <div className="grid grid-cols-[auto_1fr] gap-3 sm:gap-5">
                  <img
                    className="mr-3 w-[100px]"
                    src={
                      menu?.image ||
                      "https://i.pinimg.com/originals/2e/ce/ce/2ececec5431d0a1b7eae4e1acac7c59f.gif"
                    }
                    alt=""
                  />
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#C00A27] group-hover:text-yellow-500 text-[18px] sm:text-[20px] transition-all duration-500 font-bold">
                        {menu?.title || "Loading..."}
                      </p>
                      <p className="text-[18px] sm:text-[20px] font-bold text-[#ef2222]">
                        {menu?.discount || "Loading..."}% OFF
                      </p>
                    </div>
                    <div className="border-t-2 group-hover:border-solid border-dotted transition-all duration-500 border-t-[#3a3a3a] my-2"></div>
                    <p className="text-sm sm:text-base">
                      {menu?.description.split(" ").slice(0, 10).join(" ") +
                        (menu?.description.split(" ").length > 10 ? "..." : "")}
                    </p>
                  </div>
                </div>
              </Slide>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 pt-0 relative">
      {/* <img
        className="absolute right-0 top-0 -z-10 w-[250px] md:w-[500px]"
        src="https://yummi-theme.myshopify.com/cdn/shop/files/background-3.png?v=1614334750&width=500"
        alt=""
      />
      <img
        className="absolute left-0 bottom-0 -z-10 w-[250px] md:w-[500px]"
        src="https://yummi-theme.myshopify.com/cdn/shop/files/background-4_1.png?v=1614335490&width=500"
        alt=""
      /> */}
      <img
        className="lg:absolute md:absolute sm:absolute hidden right-0 top-0 -z-10"
        src="https://yummi-theme.myshopify.com/cdn/shop/files/background-3.png?v=1614334750&width=500"
        alt=""
      />
      <img
        className="lg:absolute md:absolute sm:absolute hidden  left-0 bottom-0 -z-10"
        src="https://yummi-theme.myshopify.com/cdn/shop/files/background-4_1.png?v=1614335490&width=500"
        alt=""
      />
      <Fade cascade direction="up" duration={1000}>
        <p className="mt-10 mb-6 text-center text-[#3a3a3a] text-[24px] sm:text-[30px] font-bold">
          Our Flavorful Menus
        </p>
      </Fade>
      <Fade cascade direction="up" duration={1000} delay={200}>
        <p className="text-center font-semibold">
          Odio morbi quis commodo odio aenean sed adipiscing. Neque ornare
          aenean{" "}
        </p>
      </Fade>
      <Fade cascade direction="up" duration={1000} delay={400}>
        <p className="mb-10 text-center font-semibold">
          euismod elementum nisi quis.
        </p>
      </Fade>

      {categorise()}
    </div>
  );
};

export default MenuComponent;
