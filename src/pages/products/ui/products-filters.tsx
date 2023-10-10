import { GET_BRANDS, GET_COLORS } from "@/shared/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { ProductsFiltersAccordionItem } from "./products-filters-accordion-item";

interface ProductsFiltersProps {}

// Brand, Color, Price, Rating, Discount

export const ProductsFilters = ({}: ProductsFiltersProps) => {
  const { data: brands } = useQuery(GET_BRANDS);
  const { data: colors } = useQuery(GET_COLORS);

  return (
    <aside className="md:w-72">
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
        <div className="border-b border-b-gray-400">
          <div className="p-4 font-light text-base md:text-lg lg:text-xl">
            
          </div>
        </div>
      </Accordion>
    </aside>
  );
};
