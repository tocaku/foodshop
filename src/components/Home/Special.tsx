import "../../App.css";
import { Slide, Fade } from "react-awesome-reveal";
const Special = () => {
  return (
    <div className="px-4 lg:px-16 pt-10">
      <Fade direction="up" cascade duration={1000}>
        <p className="text-center text-[#3a3a3a] text-2xl lg:text-[30px] font-bold">
          International Cuisines
        </p>
      </Fade>
      <Fade direction="up" cascade duration={1000} delay={1000}>
        <p className="text-center font-semibold text-lg">
          Discover Incredibly Tasty Dishes from Around the World
        </p>
      </Fade>
      <div className="flex flex-col lg:flex-row justify-evenly items-center mt-8">
        <div className="lg:w-[25%] w-full mb-8 lg:mb-0 overflow-hidden">
          <div className="mb-5 flex justify-between items-center flip-container">
            <div>
              <Slide cascade direction="left" duration={1000}>
                <p className="text-[20px] font-semibold text-right text-[#93051c]">
                  African Cuisines
                </p>
              </Slide>
              <Slide cascade direction="left" duration={1000} delay={500}>
                <p className="text-right">
                  Experience the rich and diverse flavors of Africa, from spicy
                  stews to fresh and flavorful salads.
                </p>
              </Slide>
            </div>
            {/* <Flip cascade duration={1000}> */}
            {/* <div> */}
            <img
              className="ml-[22px] w-[60px] h-[60px] flip-image"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-6.png?v=1614334577&width=710"
              alt="African Cuisines"
            />
            {/* </div> */}
            {/* </Flip> */}
          </div>
          <div className="mb-5 flex justify-between items-center flip-container">
            <div>
              <Slide cascade direction="left" duration={1000}>
                <p className="text-[20px] font-semibold text-right text-[#93051c]">
                  Asian Cuisines
                </p>
              </Slide>
              <Slide cascade direction="left" duration={1000} delay={500}>
                <p className="text-right">
                  Delight in the aromatic spices and balanced flavors that
                  define Asian cuisine, from sushi to curry.
                </p>
              </Slide>
            </div>
            <img
              className="ml-[22px] w-[60px] h-[60px] flip-image"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-5.png?v=1614334577&width=710"
              alt="Asian Cuisines"
            />
          </div>
          <div className="mb-5 flex justify-between items-center flip-container">
            <div>
              <Slide cascade direction="left" duration={1000}>
                <p className="text-[20px] font-semibold text-right text-[#93051c]">
                  European Cuisines
                </p>
              </Slide>
              <Slide cascade direction="left" duration={1000} delay={500}>
                <p className="text-right">
                  Savor the classic dishes of Europe, from Italian pasta to
                  French pastries, all crafted with tradition in mind.
                </p>
              </Slide>
            </div>
            <img
              className="ml-[22px] w-[60px] h-[60px] flip-image"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-4.png?v=1614334577&width=710"
              alt="European Cuisines"
            />
          </div>
        </div>
        <div className="lg:w-[25%] w-full mb-8 lg:mb-0">
          <img
            src="https://yummi-theme.myshopify.com/cdn/shop/files/middle-img.png?v=1614334578"
            alt="International Dishes"
            className="mx-auto"
          />
        </div>
        <div className="lg:w-[25%] w-full overflow-hidden">
          <div className="mb-5 flex justify-between items-center flip-container">
            <img
              className="w-[60px] h-[60px] flip-image mr-[22px]"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-3.png?v=1614334577&width=710"
              alt="Middle Eastern Cuisines"
            />
            <div>
              <Slide cascade direction="right" duration={1000}>
                <p className="text-[20px] font-semibold text-[#93051c]">
                  Middle Eastern Cuisines
                </p>
              </Slide>
              <Slide cascade direction="right" duration={1000} delay={500}>
                <p>
                  Indulge in the rich flavors and textures of Middle Eastern
                  cuisine, from hummus to kebabs.
                </p>
              </Slide>
            </div>
          </div>
          <div className="mb-5 flex justify-between items-center flip-container">
            <img
              className="w-[60px] h-[60px] flip-image mr-[22px]"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-2.png?v=1614334577&width=710"
              alt="Latin American Cuisines"
            />
            <div>
              <Slide cascade direction="right" duration={1000}>
                <p className="text-[20px] font-semibold text-[#93051c]">
                  Latin American Cuisines
                </p>
              </Slide>
              <Slide cascade direction="right" duration={1000} delay={500}>
                <p>
                  Discover the vibrant and colorful dishes of Latin America,
                  full of zest and flavor.
                </p>
              </Slide>
            </div>
          </div>
          <div className="mb-5 flex justify-between items-center flip-container">
            <img
              className="w-[60px] h-[60px] flip-image mr-[22px]"
              src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-1.png?v=1614334577&width=710"
              alt="North American Cuisines"
            />
            <div>
              <Slide cascade direction="right" duration={1000}>
                <p className="text-[20px] font-semibold text-[#93051c]">
                  North American Cuisines
                </p>
              </Slide>
              <Slide cascade direction="right" duration={1000} delay={500}>
                <p>
                  Enjoy the comforting and diverse flavors of North American
                  cuisine, from barbecue to maple syrup-infused dishes.
                </p>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Special;
