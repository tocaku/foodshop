import { Fade } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";

const GalleryComponent = () => {
  return (
    <div className="w-full">
      <Fade direction="up" cascade duration={1000}>
        <p className="my-10 text-center text-[#3a3a3a] text-[30px] font-bold">
          Our Gallery
        </p>
      </Fade>

      {/* Container to ensure consistent layout */}
      <Fade cascade duration={3000} className="overflow-hidden">
        <div className="flex flex-wrap">
          <div className="w-1/3 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 1</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 1
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
          <div className="w-1/3 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/1.jpg?v=1614335085&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 2</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 2
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
          <div className="w-1/3 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/2.jpg?v=1614335086&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 3</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 3
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
        </div>
      </Fade>
      {/* Second row of images */}
      <Fade cascade duration={3000} className="overflow-hidden">
        <div className="flex flex-wrap ">
          <div className="w-1/4 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/gallery-1.jpg?v=1614334580&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 4</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 4
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
          <div className="w-1/4 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/gallery-6.jpg?v=1614334580&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-20">
                <p className="text-white text-4xl mb-5 font-bold">Caption 5</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 5
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
          <div className="w-1/4 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/gallery-2.jpg?v=1614334580&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 6</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 6
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
          <div className="w-1/4 p-[1px] group relative">
            {/* <Fade cascade duration={7000}> */}
            <div className="overflow-hidden">
              <img
                className="w-full h-auto transform group-hover:scale-125 transition-transform duration-1000"
                src="https://yummi-theme.myshopify.com/cdn/shop/files/gallery-4.jpg?v=1614334580&width=1500"
                alt=""
              />
              <div className="border-[2px] m-5 border-[#C00A27] absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center z-10">
                <p className="text-white text-4xl mb-5 font-bold">Caption 7</p>
                <p className="text-white text-xl font-semibold">
                  Caption caption caption 7
                </p>
                <NavLink to="/menu">
                  <p className="my-5 p-3 bg-[#C00A27] text-white hover:text-black hover:bg-yellow-500 transition-colors duration-500">
                    View All Collections
                  </p>
                </NavLink>
              </div>
            </div>
            {/* </Fade> */}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default GalleryComponent;
