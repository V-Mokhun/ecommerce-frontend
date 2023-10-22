import { SingleProduct } from "@/shared/api";
import { imageBuilder } from "@/shared/lib/image-builder";
import { ProductInfo } from "./product-info";
import { ProductBuying } from "./product-buying";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { cn } from "@/shared/lib";

interface ProductContentProps {
  product: SingleProduct;
}

export const ProductContent = ({ product }: ProductContentProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [product.mainImage, ...product.images, ...product.images];
  const activeImage = images[activeImageIndex];

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-[0_1_500px]">
        <div className="mb-6 max-w-lg flex justify-center">
          <img
            src={imageBuilder(activeImage).height(350).url()}
            alt={product.name}
            className="object-cover h-full"
          />
        </div>
        <ul className="flex gap-6">
          {images.map((image, idx) => {
            if (idx < 4)
              return (
                <li key={idx} className="w-20 h-[70px]">
                  <button
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "border-2 border-transparent rounded-md overflow-hidden",
                      activeImageIndex === idx && "border-primary"
                    )}
                  >
                    <img
                      src={imageBuilder(image).width(80).height(70).url()}
                      alt={product.name}
                      className="object-cover"
                    />
                  </button>
                </li>
              );

            if (idx === 4)
              return (
                <li key={idx} className="w-20 h-[70px]">
                  <button
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "block rounded-md relative overflow-hidden after:block after:left-0 after:top-0 after:w-full after:h-full after:bg-black/30 after:absolute after:z-[1]"
                    )}
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-background  rounded-full z-[2] text-xs font-light inline-flex items-center justify-center">
                      +{images.length - 4}
                    </span>
                    <img
                      src={imageBuilder(image).width(80).height(70).url()}
                      alt={product.name}
                      className="object-cover"
                    />
                  </button>
                </li>
              );
          })}
        </ul>
      </div>
      <ProductInfo product={product} />
      <ProductBuying product={product} />
    </div>
  );
};
