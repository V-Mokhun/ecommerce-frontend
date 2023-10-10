import { GET_BRANDS, GET_COLORS } from "@/shared/api";
import {
  Accordion,
  Button,
  Checkbox,
  Sheet,
  SheetContent,
  Switch,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { ProductsFiltersAccordionItem } from "./products-filters-accordion-item";
import { ReactNode } from "react";

interface ProductsFiltersProps {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  isMd: boolean;
}

// Brand, Color, Price, Rating, Discount

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
  const { data: brands } = useQuery(GET_BRANDS);
  const { data: colors } = useQuery(GET_COLORS);

  return (
    <ParentComponent isMd={isMd} isOpen={isOpen} onOpen={onOpen}>
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="text">Clear All</Button>
      </div>
      <Accordion type="multiple" className="w-full">
        <ProductsFiltersAccordionItem label="Brand" value="brands">
          {brands?.allBrand.map((brand) => (
            <li
              className="flex items-center gap-4 cursor-pointer"
              key={brand._id}
            >
              <Checkbox onCheckedChange={(e) => {}} id={brand.slug!.current!} />
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
              <Checkbox onCheckedChange={(e) => {}} id={color.name!} />
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
          <Switch id="isSale" />
        </div>
        <ProductsFiltersAccordionItem
          label="Price"
          value="price"
        ></ProductsFiltersAccordionItem>
      </Accordion>
    </ParentComponent>
  );
};
