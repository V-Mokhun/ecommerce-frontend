import { Categories } from "./categories";
import { Hero } from "./hero";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <Hero />
      <Categories />
    </>
  );
};
