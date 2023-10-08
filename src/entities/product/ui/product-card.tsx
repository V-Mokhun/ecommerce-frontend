import { PRODUCT_FIELDS, Product } from "@/shared/api";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Button, Icon } from "@/shared/ui";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "rounded-sm p-2 bg-white group text-black relative group",
        className
      )}
    >
      {product.isOnSale && (
        <span className="absolute t-5 left-0 z-[1] font-lgiht py-0.5 md:py-1 px-1 md:px-1.5 block text-secondary bg-secondary-100 rounded-r-lg text-xs md:text-sm lg:text-base">
          {product.salePercentage}%
        </span>
      )}
      <div className="pb-2 mb-2 md:pb-4 md:mb-4 relative z-0 after:w-full after:h-px after:absolute after:bottom-0 after:bg-gray-400 after:left-0 after:right-0 after:transition-colors group-hover:after:bg-primary">
        <img
          className="object-cover aspect-[15/13]"
          src={imageBuilder(product.mainImage!).url()}
          alt={product.name!}
        />
      </div>
      <p className="font-light line-clamp-2 mb-4 group-hover:text-primary-500 transition-colors">
        {product.name}
      </p>
      <div className="flex items-end justify-between gap-2 group-hover:hidden">
        <div className="flex flex-col">
          {product.isOnSale ? (
            <>
              <span className="text-gray-600 text-sm line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg">${product.salePrice?.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Icon name="star" className="w-5 h-5" />
          <span className="text-medium text-primary-500">{product.rating}</span>
        </div>
      </div>
      <div className="hidden justify-end group-hover:flex">
        <Button className="gap-1 py-2.5" variant="outline">
          <Icon name="shopping-cart" className="w-6 h-6" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};
