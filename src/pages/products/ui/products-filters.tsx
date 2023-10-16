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
  const { data: colors } = useQuery(GET_COLORS);
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
        <Button variant="text">Clear All</Button>
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
                  filters.brands &&
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
        <ProductsFiltersAccordionItem label="Color" value="colors">
          {colors?.allColorItem.map((color) => (
            <li className="flex items-center gap-4" key={color._id}>
              <Checkbox
                checked={
                  filters.colors &&
                  filters.colors.find((c) => c === color.name!.toLowerCase())
                    ? true
                    : false
                }
                onCheckedChange={(e) => {
                  dispatch(
                    updateFilters({
                      key: "colors",
                      value: e
                        ? [...filters.colors, color.name!.toLowerCase()]
                        : filters.colors.filter(
                            (c) => c !== color.name!.toLowerCase()
                          ),
                    })
                  );
                }}
                id={color.name!}
              />
              <label
                htmlFor={color.name!}
                className="cursor-pointer flex flex-1 items-center gap-2 text-sm font-light md:text-base lg:text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span>{color.name}</span>
                <span
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color.value!.hex! }}
                />
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
            onCheckedChange={(checked) =>
              updateFilters({ key: "onSale", value: checked })
            }
            id="isSale"
          />
        </div>
        <ProductsFiltersAccordionItem label="Price" value="price">
          <ProductsFiltersNumber
            min={1}
            max={999_99}
            minValue={1}
            maxValue={999_99}
            minKey="priceMin"
            maxKey="priceMax"
            onChange={(key, value) => updateFilters({ key, value })}
          />
        </ProductsFiltersAccordionItem>
        <ProductsFiltersAccordionItem label="Rating" value="rating">
          <ProductsFiltersNumber
            min={1}
            max={5}
            minValue={1}
            maxValue={5}
            minKey="ratingMin"
            maxKey="ratingMax"
            step={0.1}
            minStepsBetweenThumbs={0.1}
            onChange={(key, value) => updateFilters({ key, value })}
          />
        </ProductsFiltersAccordionItem>
      </Accordion>
    </ParentComponent>
  );
};
