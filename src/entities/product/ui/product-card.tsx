import { Product } from "@/shared/api";
import { SINGLE_PRODUCT_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Button, Icon } from "@/shared/ui";
import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm p-2 md:p-4 bg-white group text-black relative group h-full shadow-md hover:shadow-sm transition-shadow",
        className
      )}
    >
      {product.isOnSale && (
        <span className="absolute t-5 left-0 z-[1] font-lgiht py-0.5 md:py-1 px-1 md:px-1.5 block text-secondary bg-secondary-100 rounded-r-lg text-xs md:text-sm lg:text-base">
          {product.salePercentage}%
        </span>
      )}
      <NavLink
        to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
        className="flex justify-center items-center pb-2 mb-2 md:pb-4 md:mb-4 relative z-0 after:w-full after:h-px after:absolute after:bottom-0 after:bg-gray-400 after:left-0 after:right-0 after:transition-colors group-hover:after:bg-primary md:p-2"
      >
        {product.colors && (
          <ul className="md:group-hover:hidden absolute top-1/2 -translate-y-1/2 right-0 flex flex-col justify-center items-center gap-1 md:gap-2">
            {product.colors.map(
              (color, i) =>
                i < 3 && (
                  <li key={color.value.hex}>
                    <span
                      className="block border-[0.5px] border-gray-800 w-2 h-2 md:w-3 md:h-3 rounded-full"
                      style={{ backgroundColor: color.value.hex }}
                    />
                  </li>
                )
            )}
            {product.colors.length > 3 && (
              <li className="font-medium text-center text-sm md:text-base">+</li>
            )}
          </ul>
        )}
        <img
          className="object-cover aspect-[15/13] max-h-28 xs:max-h-32 md:max-h-36 lg:max-h-40 max-w-[140px] md:max-w-[220px] w-full group-hover:scale-105 transition-transform"
          src={imageBuilder(product.mainImage!).url()}
          alt={product.name!}
        />
      </NavLink>
      <NavLink
        to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
        className="flex-1 font-light line-clamp-1 md:line-clamp-2 mb-2 md:mb-4 group-hover:text-primary-500 transition-colors text-xs md:text-sm lg:text-base"
      >
        {product.name}
      </NavLink>
      <div className="flex items-end justify-between gap-2 md:group-hover:hidden md:min-h-[44px]">
        <div className="flex flex-col">
          {product.isOnSale ? (
            <>
              <span className="text-gray-600 text-xxs md:text-xs lg:text-sm line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs md:text-sm lg:text-base">
                ${product.salePrice?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xs md:text-sm lg:text-base">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Icon name="star" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-medium text-primary-500 text-sm md:text-base">
            {product.rating}
          </span>
        </div>
      </div>
      <div className="hidden justify-end md:group-hover:flex">
        <Button onClick={() => {}} className="gap-1" variant="outline">
          <Icon name="shopping-cart" className="w-6 h-6" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};
