import { SingleProduct } from "@/shared/api";
import { ProductBuying } from "./product-buying";
import { ProductImages } from "./product-images";
import { ProductInfo } from "./product-info";

interface ProductContentProps {
  product: SingleProduct;
}

export const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <div className="flex gap-4 md:gap-6 items-start flex-wrap lg:flex-nowrap">
      <ProductImages product={product} />
      <ProductInfo product={product} />
      <ProductBuying product={product} />
    </div>
  );
};
