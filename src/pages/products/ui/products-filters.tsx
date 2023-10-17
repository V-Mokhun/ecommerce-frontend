import { GET_BRANDS, GET_COLORS } from "@/shared/api";
import {
  parseFiltersFromSearchParams,
  stringifyFiltersToSearchParams,
} from "@/shared/lib";
import {
  Accordion,
  Button,
  Checkbox,
  Sheet,
  SheetContent,
  Switch,
} from "@/shared/ui";
import {
  productsFiltersSelector,
  resetFilters,
  setFilters,
  updateFilters,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsFiltersAccordionItem } from "./products-filters-accordion-item";
import { ProductsFiltersNumber } from "./products-filters-number";
import { MAX_PRICE, MAX_RATING, MIN_PRICE, MIN_RATING } from "@/shared/consts";

interface ProductsFiltersProps {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  isMd: boolean;
}

const ParentComponent = ({
  isMd,
  children,
  isOpen,
  onOpen,
}: {
  isMd: boolean;
  children: ReactNode;
  isOpen: boolean;
  onOpen: (open: boolean) => void;
}) =>
  isMd ? (
    <aside className="md:w-72">{children}</aside>
  ) : (
    <Sheet open={isOpen} onOpenChange={(open) => onOpen(open)}>
      <SheetContent
        overlayClassName="z-[60]"
        closeButtonClassName="top-4"
        className="w-full z-[60] max-w-none sm:max-w-none"
      >
        {children}
      </SheetContent>
    </Sheet>
  );

export const ProductsFilters = ({
  isOpen,
  onOpen,
  isMd,
}: ProductsFiltersProps) => {
  const isMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: brands } = useQuery(GET_BRANDS);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(productsFiltersSelector);

  useEffect(() => {
    const parsedFilters = parseFiltersFromSearchParams(searchParams);
    dispatch(setFilters(parsedFilters));
  }, [searchParams]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setSearchParams((prev) => {
      const params = stringifyFiltersToSearchParams(filters, prev);
      return params;
    });
  }, [filters]);

  return (
    <ParentComponent isMd={isMd} isOpen={isOpen} onOpen={onOpen}>
      <div className="p-4 mt-4 md:mt-0 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button onClick={() => dispatch(resetFilters())} variant="text">
          Clear All
        </Button>
      </div>
      <Accordion type="multiple" className="w-full" defaultValue={["price"]}>
        <ProductsFiltersAccordionItem label="Brand" value="brands">
          {brands?.allBrand.map((brand) => (
            <li
              className="flex items-center gap-4 cursor-pointer"
              key={brand._id}
            >
              <Checkbox
                checked={
                  filters.brands.find((b) => b === brand.slug!.current)
                    ? true
                    : false
                }
                onCheckedChange={(e) => {
                  dispatch(
                    updateFilters({
                      key: "brands",
                      value: e
                        ? [...filters.brands, brand.slug!.current!]
                        : filters.brands.filter(
                            (b) => b !== brand.slug!.current
                          ),
                    })
                  );
                }}
                id={brand.slug!.current!}
              />
              <label
                htmlFor={brand.slug!.current!}
                className="flex-1 cursor-pointer text-sm font-light md:text-base lg:text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand.name}
              </label>
            </li>
          ))}
        </ProductsFiltersAccordionItem>
        <div className="border-b border-b-gray-400 p-4 font-light text-base md:text-lg lg:text-xl flex items-center gap-2 justify-between">
          <label
            className="flex-1 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="isSale"
          >
            Discount
          </label>
          <Switch
            checked={filters.onSale}
            onCheckedChange={(checked) =>
              dispatch(updateFilters({ key: "onSale", value: checked }))
            }
            id="isSale"
          />
        </div>
        <ProductsFiltersAccordionItem label="Price" value="price">
          <ProductsFiltersNumber
            min={MIN_PRICE}
            max={MAX_PRICE}
            minValue={filters.priceMin}
            maxValue={filters.priceMax}
            minKey="priceMin"
            maxKey="priceMax"
            onChange={(key, value) => dispatch(updateFilters({ key, value }))}
          />
        </ProductsFiltersAccordionItem>
        <ProductsFiltersAccordionItem label="Rating" value="rating">
          <ProductsFiltersNumber
            min={MIN_RATING}
            max={MAX_RATING}
            minValue={filters.ratingMin}
            maxValue={filters.ratingMax}
            minKey="ratingMin"
            maxKey="ratingMax"
            step={0.1}
            minStepsBetweenThumbs={0.1}
            onChange={(key, value) => dispatch(updateFilters({ key, value }))}
          />
        </ProductsFiltersAccordionItem>
      </Accordion>
    </ParentComponent>
  );
};
