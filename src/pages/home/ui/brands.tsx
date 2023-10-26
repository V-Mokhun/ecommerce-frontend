import { GET_BRANDS } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Container, Section, SectionHeading } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";

interface BrandsProps {}

export const Brands = ({}: BrandsProps) => {
  const { data } = useQuery(GET_BRANDS);

  return (
    <Section>
      <Container>
        <SectionHeading>Top Brands</SectionHeading>
        <ul className="flex overflow-x-auto md:flex-wrap items-center justify-between gap-4">
          {data?.allBrand.map((brand) => (
            <li className="p-2 md:p-0" key={brand._id}>
              <NavLink
                className="block"
                to={`${PRODUCTS_ROUTE}?brands=${brand.slug?.current}`}
              >
                <img
                  className="object-cover max-w-[75px] max-h-16 xs:max-w-[160px] xs:max-h-52 md:max-w-xs md:max-h-80 transition-transform hover:scale-105"
                  src={imageBuilder(brand.logo!).url()}
                  alt={brand.name!}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
