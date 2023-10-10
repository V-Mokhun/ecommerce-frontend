import { GET_CATEGORIES } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Container, Section } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";

interface CategoriesProps {}

export const Categories = ({}: CategoriesProps) => {
  const { data } = useQuery(GET_CATEGORIES);

  return (
    data && (
      <section>
        <ul className="flex gap-4 md:gap-6 whitespace-nowrap overflow-x-auto py-3 md:py-4 lg:py-6 px-4 max-w-container mx-auto">
          {data.allCategory.map((category) => (
            <li
              key={category._id}
              className="py-2 px-2 md:px-4 shadow-sm rounded-lg group text-center flex-[0_0_30%] xs:flex-[0_0_20%] lg:flex-auto"
            >
              <NavLink
                className="block"
                to={`${PRODUCTS_ROUTE}/${category.slug?.current}`}
              >
                <div className="mb-2 md:mb-3 w-full flex justify-center">
                  <img
                    className="object-cover h-auto w-full max-w-[65px] xs:max-w-[90px] md:max-w-[110px] lg:max-w-[150px]"
                    src={imageBuilder(category.image!)
                      .width(150)
                      .height(150)
                      .url()}
                    alt={category.name!}
                  />
                </div>
                <span className="font-light text-xs sm:text-sm lg:text-base group-hover:text-primary transition-colors text-gray-900">
                  {category.shortName}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    )
  );
};
