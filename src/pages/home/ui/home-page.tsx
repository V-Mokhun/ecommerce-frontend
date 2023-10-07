import { Categories } from "./categories";
import { Hero } from "./hero";
import { SaleProducts } from "./sale-products";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <Hero />
      <Categories />
      <SaleProducts />
    </>
  );
};
