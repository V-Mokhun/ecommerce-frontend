import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Container, buttonVariants } from "@/shared/ui";
import { NavLink } from "react-router-dom";

interface HeroProps {}

export const Hero = ({}: HeroProps) => {
  return (
    <section>
      <Container>
        <div className="flex justify-between">
          <div className="flex flex-col h-full">
            <h1 className="font-semibold text-2xl md:text-4xl lg:text-6xl text-primary-700 mb-2 md:mb-5 lg:mb-8">
              Ecommerce
            </h1>
            <p className="text-primary-700 font-medium text-xs xs:text-base md:text-xl lg:text-3xl">
              "Join the{" "}
              <span className="text-secondary">digital revolution</span>"
            </p>
            <NavLink
              to={PRODUCTS_ROUTE}
              className={buttonVariants({ variant: "secondary" })}
            >
              Explore More
            </NavLink>
          </div>
        </div>
      </Container>
    </section>
  );
};
