import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
} from "@/shared/ui";

interface ProductsFiltersAccordionItemProps {
  label: string;
  value: string;
  children?: React.ReactNode;
}

export const ProductsFiltersAccordionItem = ({
  children,
  label,
  value,
}: ProductsFiltersAccordionItemProps) => {
  return (
    <AccordionItem className="border-b border-b-gray-400" value={value}>
      <AccordionTrigger className="p-4 font-light text-base md:text-lg lg:text-xl">
        {label}
      </AccordionTrigger>
      <AccordionContent asChild>
        <ul className="p-4 pt-0 space-y-4 max-h-80 overflow-y-auto">{children}</ul>
      </AccordionContent>
    </AccordionItem>
  );
};
