import { SingleProduct } from "@/shared/api";
import { MutationPlugin, ThumbnailPlugin, cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Dialog, DialogContent, SliderArrow } from "@/shared/ui";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import "@/shared/styles/slider.css";
import { useMediaQuery } from "@/shared/lib/hooks";

interface ProductImagesProps {
  product: SingleProduct;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [product.mainImage, ...product.images];
  const activeImage = images[activeImageIndex];
  const isMd = useMediaQuery("(min-width: 768px)");

  const [loaded, setLoaded] = useState(false);
  const options = useRef<KeenSliderOptions>({
    initial: activeImageIndex,
    slides: {
      perView: 5,
      spacing: 20,
      origin: "center",
    },
    created(slider) {
      setLoaded(true);

      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          setActiveImageIndex(idx);
        });
      });
    },
    slideChanged(slider) {
      setActiveImageIndex(slider.track.details.rel);
    },
  });
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    options.current
  );

  useEffect(() => {
    options.current.initial = activeImageIndex;
    instanceRef.current?.update(options.current, activeImageIndex);
  }, [isModalActive]);

  return (
    <>
      <Dialog
        open={isModalActive}
        onOpenChange={(open) => setIsModalActive(open)}
      >
        <DialogContent>
          <div className="flex items-center justify-center">
            <img
              src={imageBuilder(activeImage).height(350).url()}
              alt={product.name}
              className="object-cover h-full"
            />
          </div>
          <div ref={sliderRef} className="relative keen-slider px-10">
            {images.map((image, idx) => (
              <div
                className={cn(
                  "keen-slider__slide flex justify-center border rounded-sm border-gray-400",
                  idx === activeImageIndex && "border-primary"
                )}
                key={idx}
              >
                <img
                  src={imageBuilder(image).height(120).url()}
                  alt={product.name}
                  className="object-cover h-full"
                />
              </div>
            ))}

            {isMd && loaded && instanceRef.current && (
              <>
                <SliderArrow
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.prev();
                  }}
                  disabled={activeImageIndex === 0}
                />

                <SliderArrow
                  right
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.next();
                  }}
                  disabled={
                    activeImageIndex >= instanceRef.current.slides.length - 1
                  }
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex-1 md:flex-[0_1_500px]">
        <button
          className="md:mb-6 md:max-w-lg flex w-full justify-center"
          onClick={() => setIsModalActive(true)}
        >
          <img
            src={imageBuilder(activeImage).height(350).url()}
            alt={product.name}
            className="object-cover h-[200px] sm:h-[250px] md:h-full"
          />
        </button>
        <ul className="md:flex gap-6 hidden">
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
                    onClick={() => setIsModalActive(true)}
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
    </>
  );
};
