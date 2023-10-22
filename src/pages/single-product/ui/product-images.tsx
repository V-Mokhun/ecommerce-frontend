import { SingleProduct } from "@/shared/api";
import { MutationPlugin, ThumbnailPlugin, cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Dialog, DialogContent } from "@/shared/ui";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import "@/shared/styles/slider.css";

interface ProductImagesProps {
  product: SingleProduct;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [product.mainImage, ...product.images, ...product.images];
  const activeImage = images[activeImageIndex];
  const options = useRef<KeenSliderOptions>({
    initial: activeImageIndex,
    slides: {
      perView: 5,
      spacing: 20,
    },
    disabled: true,
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      setActiveImageIndex(slider.track.details.rel);
    },
  });
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    options.current
  );

  useEffect(() => {
    setTimeout(() => {
      instanceRef.current?.update(
        { ...options.current, disabled: false },
        activeImageIndex
      );
    }, 0);
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
          <div ref={sliderRef} className="keen-slider">
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
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex-[0_1_500px]">
        <button
          className="mb-6 max-w-lg flex w-full justify-center"
          onClick={() => setIsModalActive(true)}
        >
          <img
            src={imageBuilder(activeImage).height(350).url()}
            alt={product.name}
            className="object-cover h-full"
          />
        </button>
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
