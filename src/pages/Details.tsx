import Product from "../components/Details/Product";
import ReviewForm from "../components/Details/ReviewForm";
import Reviews from "../components/Details/Reviews";
import Upper from "../components/Details/Upper";

const Details = () => {
  return (
    <div>
      <Upper />
      <Product />
      <ReviewForm />
      <Reviews />
    </div>
  );
};

export default Details;
