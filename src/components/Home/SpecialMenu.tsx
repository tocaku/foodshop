import { Fade } from "react-awesome-reveal";

const SpecialMenu = () => {
  return (
    <div
      className="bg-[url('https://yummi-theme.myshopify.com/cdn/shop/files/bg-img-1_1.png?v=1614334735&width=1920')] 
      md:bg-contain lg:bg-cover bg-contain  bg-center flex justify-center w-full h-full"
    >
      <div className="mx-auto w-[90%] lg:w-[80%] flex flex-wrap justify-between my-10">
        {/* Image Section */}
        <img
          className="lg:w-[50%] md:w-[90%] w-[70%] mb-5 md:mb-0"
          src="https://yummi-theme.myshopify.com/cdn/shop/files/img-1.jpg?v=1614334579"
          alt=""
        />
        {/* Text Section */}
        <div className="lg:w-[45%] md:w-[85%] w-[85%]">
          <Fade cascade duration={1000} direction="up">
            <p className="text-[30px] font-semibold text-[#3A3A3A] pt-5">
              What Makes Our Menus Special?
            </p>
          </Fade>
          <Fade cascade duration={1000} direction="up">
            <div className="group flex justify-between mt-5 w-[100%] md:w-[80%] flip-container">
              <img
                className="mr-5 flip-image"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-7_c08b5cdb-f091-48b2-93c1-e09b38cca5f1.png?v=1614334579&width=710"
                alt="Pure Ingredients Icon"
              />
              <div>
                <p className="text-[#C00A27] group-hover:text-yellow-500 transition-all duration-500 mb-1 text-[25px] font-semibold">
                  Pure Ingredients
                </p>
                <p>
                  Vestibulum morbi blandit cursus risus at ultrices mi.
                  Facilisis gravida neque convallis a.
                </p>
              </div>
            </div>
          </Fade>
          <Fade cascade duration={1000} direction="up">
            <div className="group flex justify-between mt-3 w-[100%] md:w-[80%] flip-container">
              <img
                className="mr-5 flip-image"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-8_3fa55acb-a7d3-4358-9a71-260d4a3d61ae.png?v=1614334579&width=710"
                alt="Sustainability Icon"
              />
              <div>
                <p className="text-[#C00A27] group-hover:text-yellow-500 transition-all duration-500 mb-1 text-[25px] font-semibold">
                  Sustainability
                </p>
                <p>
                  Laculis eu non diam phasellus. Dictum non consectetur a erat
                  nam at. Quam adipiscing vitae proin sagittis.
                </p>
              </div>
            </div>
          </Fade>
          <Fade cascade duration={1000} direction="up">
            <div className="group flex justify-between mt-3 w-[100%] md:w-[80%] flip-container">
              <img
                className="mr-5 flip-image"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-9.png?v=1614334579&width=710"
                alt="Environmentalism Icon"
              />
              <div>
                <p className="text-[#C00A27] group-hover:text-yellow-500 transition-all duration-500 mb-1 text-[25px] font-semibold">
                  Environmentalism
                </p>
                <p>
                  Bibendum est ultricies integer quis auctor elit sed. Accumsan
                  tortor posuere ac ut consequat semper.
                </p>
              </div>
            </div>
          </Fade>
          <Fade cascade duration={1000} direction="up">
            <div className="group flex justify-between mt-3 w-[100%] md:w-[80%] flip-container">
              <img
                className="mr-5 flip-image"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-10.png?v=1614334579&width=710"
                alt="Formula Transparency Icon"
              />
              <div>
                <p className="text-[#C00A27] group-hover:text-yellow-500 transition-all duration-500 mb-1 text-[25px] font-semibold">
                  Formula Transparency
                </p>
                <p>
                  Facilisi nullam vehicula ipsum a. Ornare massa eget egestas
                  purus viverra accumsan in nisl nisi.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default SpecialMenu;
