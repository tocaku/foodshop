import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";

const Countdown = () => {
  return (
    <div className="flex w-full lg:py-14 py-5 px-24 justify-between flex-wrap">
      <div className="lg:w-1/4 md:w-1/2 w-full py-5 md:py-0 lg:py-0 flex flex-col justify-center items-center">
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-12.png?v=1614334585&width=275"
          alt=""
        />
        <p className="text-[#3A3A3A] font-bold mt-3 text-[25px] text-center">
          Menu Types
        </p>
        <CountUp end={200} redraw={true}>
          {({ countUpRef, start }) => (
            <ReactVisibilitySensor onChange={start} delayedCall>
              <span
                ref={countUpRef}
                className="text-[#C00A27] font-bold mt-3 text-[29px]"
              />
            </ReactVisibilitySensor>
          )}
        </CountUp>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full py-5 md:py-0 lg:py-0 flex flex-col justify-center items-center">
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-13.png?v=1614334585&width=275"
          alt=""
        />
        <p className="text-[#3A3A3A] font-bold mt-3 text-[25px] text-center">
          Noodles
        </p>
        <CountUp end={50} redraw={true}>
          {({ countUpRef, start }) => (
            <ReactVisibilitySensor onChange={start} delayedCall>
              <span
                ref={countUpRef}
                className="text-[#C00A27] font-bold mt-3 text-[29px]"
              />
            </ReactVisibilitySensor>
          )}
        </CountUp>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full py-5 md:py-0 lg:py-0 flex flex-col justify-center items-center">
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-14.png?v=1614334585&width=275"
          alt=""
        />
        <p className="text-[#3A3A3A] font-bold mt-3 text-[25px] text-center">
          Different Origin
        </p>
        <CountUp end={850} redraw={true}>
          {({ countUpRef, start }) => (
            <ReactVisibilitySensor onChange={start} delayedCall>
              <span
                ref={countUpRef}
                className="text-[#C00A27] font-bold mt-3 text-[29px]"
              />
            </ReactVisibilitySensor>
          )}
        </CountUp>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full py-5 md:py-0 lg:py-0 flex flex-col jbold-center items-center">
        <img
          src="https://yummi-theme.myshopify.com/cdn/shop/files/icon-11.png?v=1614334585&width=275"
          alt=""
        />
        <p className="text-[#3A3A3A] font-bold mt-3 text-[25px] text-center">
          Menu To Go
        </p>
        <CountUp end={580} redraw={true}>
          {({ countUpRef, start }) => (
            <ReactVisibilitySensor onChange={start} delayedCall>
              <span
                ref={countUpRef}
                className="text-[#C00A27] font-bold mt-3 text-[29px]"
              />
            </ReactVisibilitySensor>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Countdown;
