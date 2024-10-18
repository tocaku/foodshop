import MenuComponent from "../components/Home/Menu";

const Discount = () => {
  return (
    <div>
      <div
        style={{ backgroundPosition: "100% 8%" }}
        className="hero bg-[url(https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320&width=1920)] bg-no-repeat bg-cover"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content py-10 flex-col">
          <p className="text-[36px] font-bold text-white text-center">
            Discout
          </p>
          <p className="text-[20px] text-white font-semibold text-center">
            Home/Discount
          </p>
        </div>
      </div>
      <MenuComponent />
    </div>
  );
};

export default Discount;
