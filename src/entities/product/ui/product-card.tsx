import { PRODUCT_FIELDS, Product } from "@/shared/api";
import { SINGLE_PRODUCT_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Button, Icon } from "@/shared/ui";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm p-2 bg-white group text-black relative group h-full",
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
        className="block pb-2 mb-2 md:pb-4 md:mb-4 relative z-0 after:w-full after:h-px after:absolute after:bottom-0 after:bg-gray-400 after:left-0 after:right-0 after:transition-colors group-hover:after:bg-primary"
      >
        <img
          className="object-cover aspect-[15/13] max-h-28 xs:max-h-32 md:max-h-36 lg:max-h-40 w-full"
          src={imageBuilder(product.mainImage!).width(216).height(160).url()}
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
