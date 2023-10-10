import { GET_BRANDS } from "@/shared/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";

interface ProductsFiltersProps {}

// Brand, Color, Price, Rating, Discount

export const ProductsFilters = ({}: ProductsFiltersProps) => {
  const { data: brands } = useQuery(GET_BRANDS);
  // const { data: colors } = useQuery(GET_COLORS);

  return (
    <aside className="md:w-72">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="text">Clear All</Button>
      </div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem className="border-b border-b-gray-400" value="brands">
          <AccordionTrigger className="p-4 font-light text-base md:text-lg lg:text-xl">
            Brands
          </AccordionTrigger>
          <AccordionContent asChild>
            <ul className="p-4 pt-0 space-y-4">
              {brands?.allBrand.map((brand) => (
                <li
                  className="flex items-center gap-4 cursor-pointer"
                  key={brand._id}
                >
                  <Checkbox
                    onCheckedChange={(e) => {}}
                    id={brand.slug!.current!}
                  />
                  <label
                    htmlFor={brand.slug!.current!}
                    className="cursor-pointer text-sm font-light md:text-base lg:text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
