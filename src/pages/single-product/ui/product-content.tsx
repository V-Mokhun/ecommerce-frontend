import { SingleProduct } from "@/shared/api";
import { ProductBuying } from "./product-buying";
import { ProductImages } from "./product-images";
import { ProductInfo } from "./product-info";

interface ProductContentProps {
  product: SingleProduct;
}

export const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <div className="flex gap-6 items-start">
      <ProductImages product={product} />
      <ProductInfo product={product} />
      <ProductBuying product={product} />
    </div>
  );
};
