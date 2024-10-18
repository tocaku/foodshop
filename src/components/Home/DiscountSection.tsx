import { Fade } from "react-awesome-reveal";
const DiscountSection = () => {
  return (
    <div className="bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/bg-2.jpg?v=1614334584&width=1920)] bg-cover bg-fixed bg-no-repeat w-full flex justify-center items-center">
      <div className="my-24 md:my-36 w-[90%] md:w-[60%]">
        <Fade cascade direction="up" duration={1000}>
          <p className="text-[#3A3A3A] font-bold text-[16px] md:text-[20px] text-center my-2 md:my-3">
            Enjoy Great Recipe
          </p>
        </Fade>
        <Fade cascade direction="up" duration={1000}>
          <p className="text-[#C00A27] text-[28px] md:text-[60px] font-semibold text-center my-2 md:my-3">
            Simple And Delicious Food
          </p>
        </Fade>
        <Fade cascade direction="up" duration={1000}>
          <p className="text-[#3A3A3A] font-semibold text-[24px] md:text-[40px] text-center my-2 md:my-3">
            With Special Discount
          </p>
        </Fade>
        <Fade cascade direction="up" duration={1000}>
          <div className="flex justify-center items-center mt-6 md:mt-10 font-medium">
            <p className="bg-[#C00A27] hover:bg-yellow-500 text-[white] hover:text-[#3A3A3A] transition-colors duration-500 p-4 text-center w-[50%] md:w-[20%]">
              Order Now
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default DiscountSection;
