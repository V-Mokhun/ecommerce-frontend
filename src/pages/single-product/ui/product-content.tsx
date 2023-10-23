import { SingleProduct } from "@/shared/api";
import { ProductBuying } from "./product-buying";
import { ProductImages } from "./product-images";
import { ProductInfo } from "./product-info";
import { ProductDetails } from "./product-details";
import { useState } from "react";

interface ProductContentProps {
  product: SingleProduct;
}

export const ProductContent = ({ product }: ProductContentProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <>
      <div className="flex gap-4 md:gap-6 items-start flex-wrap lg:flex-nowrap mb-6 md:mb-8">
        <ProductImages product={product} />
        <ProductInfo
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          product={product}
        />
        <ProductBuying color={selectedColor} product={product} />
      </div>
      <ProductDetails details={product.details} />
    </>
  );
};
