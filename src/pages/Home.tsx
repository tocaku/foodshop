import Banner from "../components/Home/Banner";
import Category from "../components/Home/Category";
import Client from "../components/Home/Client";
import Countdown from "../components/Home/Countdown";
import DiscountSection from "../components/Home/DiscountSection";
import GalleryComponent from "../components/Home/Gallery";
import Latest from "../components/Home/Latest";
import MenuComonent from "../components/Home/Menu";
import ReviewSection from "../components/Home/ReviewSection";
import Special from "../components/Home/Special";
import SpecialMenu from "../components/Home/SpecialMenu";
import Subscribe from "../components/Home/Subscribe";

const Home = () => {
  return (
    <div>
      <Banner />
      <Special />
      <Latest />
      <Category />
      <GalleryComponent />
      <MenuComonent />
      <ReviewSection />
      <SpecialMenu />
      <DiscountSection />
      <Countdown />
      <Subscribe />
      <Client />
    </div>
  );
};

export default Home;
