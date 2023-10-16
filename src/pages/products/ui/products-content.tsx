import { useMediaQuery } from "@/shared/lib/hooks";
import { ProductsFilters } from "./products-filters";
import { useState } from "react";
import {
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, Product } from "@/shared/api";
import { ProductCard } from "@/entities";
import { SortOrder } from "@/shared/api/generated/graphql";

interface ProductsContentProps {
  category: string;
}

export const ProductsContent = ({ category }: ProductsContentProps) => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    data: products,
    fetchMore,
    loading,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      filters: { category: { slug: { current: { eq: category } } } },
      sort: { rating: SortOrder.Desc },
      limit: 5,
    },
  });

  console.log(products);

  return (
    <div>
      <ul className="mb-6 md:mb-8"></ul>
      <div className="flex items-center md:justify-end gap-4 mb-4 md:mb-6">
        <button
          className="flex-auto p-2 shadow-md bg-white rounded-lg inline-flex items-center gap-2 md:hidden"
          type="button"
          onClick={() => setIsFilterOpen(true)}
        >
          <Icon name="filters" className="w-4 h-4" />
          <span className="font-light">Filters</span>
        </button>
        <Select defaultValue="rating">
          <SelectTrigger className="flex-auto w-auto md:w-full md:max-w-xs">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="priceAsc">Price: ascending</SelectItem>
            <SelectItem value="priceDesc">Price: descending</SelectItem>
            <SelectItem value="new">New arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-6 mb-4 md:mb-6 items-start">
        <ProductsFilters
          isOpen={isMd || isFilterOpen}
          isMd={isMd}
          onOpen={(open) => setIsFilterOpen(open)}
        />
        <ul className="flex flex-wrap gap-4 md:gap-6 flex-1">
          {products?.allProduct.map((product) => (
            <li
              className="flex-[0_1_calc(50%-8px)] md:flex-[0_1_calc(33.3%-18px)]"
              key={product._id}
            >
              <ProductCard product={product as Product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
