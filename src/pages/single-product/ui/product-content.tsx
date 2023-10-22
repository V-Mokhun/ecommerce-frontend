import { SingleProduct } from "@/shared/api";
import { imageBuilder } from "@/shared/lib/image-builder";
import { ProductInfo } from "./product-info";
import { ProductBuying } from "./product-buying";

interface ProductContentProps {
  product: SingleProduct;
}

export const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-[0_1_500px]">
        <div className="mb-6">
          <img
            src={imageBuilder(product.mainImage).maxWidth(500).url()}
            alt={product.name}
            className="object-cover h-full w-full"
          />
        </div>
      </div>
      <ProductInfo product={product} />
      <ProductBuying product={product} />
    </div>
  );
};
