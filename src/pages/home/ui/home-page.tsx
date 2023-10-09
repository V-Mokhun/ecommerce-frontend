import { useQuery } from "@apollo/client";
import { BestSellerProducts } from "./best-seller-products";
import { Categories } from "./categories";
import { Hero } from "./hero";
import { NewProducts } from "./new-products";
import { SaleProducts } from "./sale-products";
import { GET_HOME_BANNERS } from "@/shared/api";
import { imageBuilder } from "@/shared/lib/image-builder";
import { useMediaQuery } from "@/shared/lib/hooks";
import { Container, Section } from "@/shared/ui";
import { NavLink } from "react-router-dom";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Brands } from "./brands";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  const isXs = useMediaQuery("(min-width: 479px)");
  const { data } = useQuery(GET_HOME_BANNERS);
  const mediumBanner = data?.mediumBanner[0];
  const largeBanner = data?.largeBanner[0];
  const smallBanner = data?.smallBanner[0];

  return (
    <>
      <Hero />
      <Categories />
      <SaleProducts />
      <NewProducts />
      <Section>
        <Container>
          {mediumBanner && smallBanner && (
            <div className="flex flex-col xs:flex-row gap-4 md:gap-6">
              <NavLink
                className="flex-[0_0_calc(60%-12px)"
                to={mediumBanner.link || PRODUCTS_ROUTE}
              >
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={imageBuilder(
                    isXs
                      ? mediumBanner.desktopImage!
                      : mediumBanner.mobileImage!
                  ).url()}
                  alt={mediumBanner.title || "Banner"}
                />
              </NavLink>
              <NavLink
                className="flex-auto"
                to={smallBanner.link || PRODUCTS_ROUTE}
              >
                <img
                  className="object-cover w-full rounded-lg"
                  src={imageBuilder(
                    isXs ? smallBanner.desktopImage! : smallBanner.mobileImage!
                  ).url()}
                  alt={smallBanner.title || "Banner"}
                />
              </NavLink>
            </div>
          )}
        </Container>
      </Section>
      <BestSellerProducts />
      <Brands />
      <Section>
        <Container>
          {largeBanner && (
            <NavLink className="block" to={largeBanner.link || PRODUCTS_ROUTE}>
              <img
                className="object-cover w-full h-full rounded-lg"
                src={imageBuilder(
                  isXs ? largeBanner.desktopImage! : largeBanner.mobileImage!
                ).url()}
                alt={largeBanner.title || "Banner"}
              />
            </NavLink>
          )}
        </Container>
      </Section>
    </>
  );
};
