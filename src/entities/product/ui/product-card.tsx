import { PRODUCT_FIELDS, Product } from "@/shared/api";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div className={cn("rounded-sm p-2 bg-white", className)}>
      <div className="pb-4 mb-4 relative after:w-full after:h-px after:absolute after:bottom-0 after:bg-gray-600 after:left-0 after:right-0">
        <img
          className="w-full h-auto object-cover"
          src={imageBuilder(product.mainImage!).url()}
          alt={product.name!}
        />
      </div>
    </div>
  );
};
