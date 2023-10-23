import { SingleProduct } from "@/shared/api";
import { ProductBuying } from "./product-buying";
import { ProductImages } from "./product-images";
import { ProductInfo } from "./product-info";
import { ProductDetails } from "./product-details";
import { useState } from "react";
import { ProductsCarousel } from "@/widgets";

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
      {product.similarProducts && product.similarProducts.length > 0 && (
        <div className="py-2 md:py-4 lg:py-6">
          <h2 className="mb-1 md:mb-4 lg:mb-6 text-sm md:text-base lg:text-xl font-medium">
            Similar Products
          </h2>
          <ProductsCarousel products={product.similarProducts} />
        </div>
      )}
    </>
  );
};
