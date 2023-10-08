import { BestSellerProducts } from "./best-seller-products";
import { Categories } from "./categories";
import { Hero } from "./hero";
import { NewProducts } from "./new-products";
import { SaleProducts } from "./sale-products";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <Hero />
      <Categories />
      <SaleProducts />
      <NewProducts />
      <BestSellerProducts />
    </>
  );
};
