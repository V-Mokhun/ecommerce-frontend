import { useMediaQuery } from "@/shared/lib/hooks";
import { ProductsFilters } from "./products-filters";
import { useState } from "react";
import { Icon } from "@/shared/ui";

interface ProductsContentProps {}

export const ProductsContent = ({}: ProductsContentProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <ul className="mb-6 md:mb-8"></ul>
      <div className="flex items-center md:justify-end gap-4">
        <button
          className="flex-auto p-2 shadow-md bg-white rounded-lg inline-flex items-center gap-2 md:hidden"
          type="button"
          onClick={() => setIsFilterOpen(true)}
        >
          <Icon name="filters" className="w-4 h-4" />
          <span className="font-light">Filters</span>
        </button>
        <button>Sort</button>
      </div>
      <div className="flex gap-6 mb-4 md:mb-6">
        <ProductsFilters
          isOpen={isMd || isFilterOpen}
          isMd={isMd}
          onOpen={(open) => setIsFilterOpen(open)}
        />
        <div className="flex-1"></div>
      </div>
    </div>
  );
};
