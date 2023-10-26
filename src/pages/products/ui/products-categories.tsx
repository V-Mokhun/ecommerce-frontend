import { GET_CATEGORIES } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { useQuery } from "@apollo/client";
import { NavLink, useSearchParams } from "react-router-dom";

interface ProductsCategoriesProps {}

export const ProductsCategories = ({}: ProductsCategoriesProps) => {
  const { data } = useQuery(GET_CATEGORIES);
  const [params] = useSearchParams();

  return (
    <ul className="flex overflow-x-auto md:flex-wrap items-center md:justify-center gap-3 md:gap-4 pb-6 md:pb-9 lg:pb-12">
      {data?.allCategory.map((category) => (
        <li key={category._id}>
          <NavLink
            className={({ isActive }) =>
              cn(
                `inline-flex md:text-lg lg:text-xl flex-col items-center gap-3 md:gap-4 p-1 md:p-2 border-b border-b-transparent md:border-b-[3px] hover:border-b-primary transition-colors text-gray-800 font-light`,
                isActive && `border-b-primary`
              )
            }
            to={{
              pathname: `${PRODUCTS_ROUTE}/${category.slug?.current}`,
              search: params.toString(),
            }}
          >
            <img
              className="w-9 h-9 md:w-12 md:h-12 object-cover"
              src={imageBuilder(category.icon!).url()}
              alt={category.name!}
            />
            <span>{category.shortName}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
