import { ProductCard } from "@/entities";
import { GET_SALE_PRODUCTS, Product } from "@/shared/api";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import "@/shared/styles/slider.css";
import { Container, Section, SliderArrow } from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { MutationPlugin } from "@/shared/lib";
import { useMediaQuery } from "@/shared/lib/hooks";

interface SaleProductsProps {}

export const SaleProducts = ({}: SaleProductsProps) => {
  const { data } = useQuery(GET_SALE_PRODUCTS);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMd = useMediaQuery("(min-width: 768px)");
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {},
      slides: {
        perView: "auto",
      },
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [MutationPlugin]
  );

  return (
    <Section>
      <Container>
        <div className="py-4 md:py-8 lg:py-12 pl-2 md:pl-5 bg-primary-500 rounded-lg text-white relative">
          <div className="absolute z-0 left-0 top-0 ">
            <svg
              id="sw-js-blob-svg"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-60 md:w-96 h-full"
            >
              <defs>
                <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                  <stop
                    id="stop1"
                    stop-color="rgba(16.874, 81.972, 180.524, 0.75)"
                    offset="0%"
                  ></stop>
                  <stop
                    id="stop2"
                    stop-color="rgba(19.684, 82.773, 178.283, 0.71)"
                    offset="100%"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#sw-gradient)"
                d="M22.4,-29C25.3,-24.3,21.3,-13.7,19.8,-5.9C18.2,1.9,19.2,6.8,18.3,12.6C17.4,18.5,14.5,25.2,8.8,29.6C3.1,34.1,-5.4,36.1,-12.2,33.6C-19.1,31.1,-24.3,24.1,-28,16.7C-31.7,9.2,-33.8,1.4,-30.9,-3.7C-27.9,-8.9,-19.8,-11.5,-13.8,-15.5C-7.8,-19.6,-3.9,-25.2,2.9,-28.7C9.8,-32.2,19.6,-33.6,22.4,-29Z"
                width="100%"
                height="100%"
                transform="translate(10 25)"
                strokeWidth="0"
                className="transition-all"
                stroke="url(#sw-gradient)"
              ></path>
            </svg>
          </div>
          <div className="flex items-stretch mb-2 relative z-[1]">
            <div className="flex flex-col text-center md:py-4 mr-4 xs:mr-8 md:mr-14 lg:mr-20">
              <h3 className="font-medium text-base md:text-xl lg:text-2xl mb-2">
                Products On Sale
              </h3>
              <p className="font-light text-sm md:text-base lg:text-xl flex-1">
                Show Now!
              </p>
              <NavLink
                className="inline-flex items-center justify-center gap-1 mt-4 hover:underline"
                to={PRODUCTS_ROUTE}
              >
                <span>View {isMd && "all"}</span>
                <ChevronRight className="w-6 h-6" />
              </NavLink>
            </div>
            <div className="keen-slider gap-4 md:gap-6" ref={sliderRef}>
              {data?.allProduct && (
                <>
                  {data.allProduct.map((product) => (
                    <div
                      className="keen-slider__slide h-full flex-[0_0_60%] xs:flex-[0_0_40%] md:flex-[0_0_27%] lg:flex-[0_0_21%]"
                      key={product._id}
                    >
                      <ProductCard product={product as Product} />
                    </div>
                  ))}
                  <div className="keen-slider__slide flex-[0_0_60%] xs:flex-[0_0_40%] md:flex-[0_0_27%] lg:flex-[0_0_21%]"></div>
                </>
              )}
            </div>
          </div>
          {isMd && loaded && instanceRef.current && (
            <div className="flex items-center gap-2 mr-2 justify-end">
              <SliderArrow
                light
                className="static translate-y-0"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
              />

              <SliderArrow
                light
                right
                className="static translate-y-0"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={
                  currentSlide === instanceRef.current.track?.details?.maxIdx
                }
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
