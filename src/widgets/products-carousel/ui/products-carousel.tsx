import { Product } from "@/shared/api";
import { useKeenSlider } from "keen-slider/react";
import "@/shared/styles/slider.css";
import { ProductCard } from "@/entities";
import { useMediaQuery } from "@/shared/lib/hooks";
import { useState } from "react";
import { SliderArrow } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface ProductsCarouselProps {
  products: Product[];
}

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: "auto",
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
    },
    created: () => setLoaded(true),
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider py-2 -mx-2 px-2">
        {products.map((product) => (
          <div
            key={product._id}
            className={cn(
              "keen-slider__slide bg-background shadow-md rounded-sm hover:shadow-sm transition-shadow",
              !isMd && "flex-[0_0_45%] xs:flex-[0_0_40%]"
            )}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {isMd && loaded && instanceRef.current && (
        <>
          <SliderArrow
            className="md:-left-4"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <SliderArrow
            right
            className="md:-right-4"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={
              currentSlide === instanceRef.current.track?.details?.maxIdx
            }
          />
        </>
      )}
    </div>
  );
};
