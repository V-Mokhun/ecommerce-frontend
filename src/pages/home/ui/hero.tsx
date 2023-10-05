import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Container, buttonVariants } from "@/shared/ui";
import { NavLink } from "react-router-dom";

interface HeroProps {}

export const Hero = ({}: HeroProps) => {
  return (
    <section className="pb-3 md:pb-4 lg:pb-6">
      <Container>
        <div className="flex justify-between mt-6 md:mt-0">
          <div className="flex-auto mt-4 md:mt-10">
            <h1 className="font-medium md:font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-700 mb-2 md:mb-5 lg:mb-8">
              Ecommerce
            </h1>
            <p className="text-primary-700 font-medium text-xs xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
              "Join the{" "}
              <span className="text-secondary">digital revolution</span>"
            </p>
            <NavLink
              to={PRODUCTS_ROUTE}
              className={buttonVariants({
                variant: "secondary",
                className:
                  "md:w-full max-w-xs mt-14 xs:mt-16 sm:mt-20 md:mt-24 lg:mt-28",
              })}
            >
              Explore More
            </NavLink>
          </div>
          <div className="-ml-10 flex-[0_1_60%]">
            <img
              className="object-cover max-w-full h-auto"
              src="/images/hero.png"
              alt="Hero"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
