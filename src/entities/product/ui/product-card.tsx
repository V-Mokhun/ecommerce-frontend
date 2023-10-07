import { PRODUCT_FIELDS, Product, useFragment } from "@/shared/api";
import { imageBuilder } from "@/shared/lib/image-builder";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product: productFragment }: ProductCardProps) => {
  const product = useFragment(PRODUCT_FIELDS, productFragment);

  return (
    <div className="rounded-sm p-2">
      <div>
        <img
          className="w-full h-auto object-cover"
          src={imageBuilder(product.mainImage!).url()}
          alt={product.name!}
        />
      </div>
			
    </div>
  );
};
