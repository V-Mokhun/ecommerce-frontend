import { useMediaQuery } from "@/shared/lib/hooks";
import { ProductsFilters } from "./products-filters";
import { useState } from "react";
import {
  Heading,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/shared/ui";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, Product, SortFields } from "@/shared/api";
import { ProductCard } from "@/entities";
import { useSearchParams } from "react-router-dom";
import {
  makeFiltersQuery,
  parseFiltersFromSearchParams,
  parseSortFromSearchParams,
} from "@/shared/lib";
import { Pagination } from "@/widgets";
import { PRODUCTS_LIMIT } from "@/shared/consts";
import { updateFilters, useAppDispatch } from "@/store";

interface ProductsContentProps {
  category: string | undefined;
}

export const ProductsContent = ({ category }: ProductsContentProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = parseSortFromSearchParams(searchParams);
  const filters = parseFiltersFromSearchParams(searchParams);

  const filtersQuery = makeFiltersQuery(filters);

  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      filters: {
        category: { slug: { current: { eq: category } } },
        ...filtersQuery,
      },
      sort,
      limit: PRODUCTS_LIMIT,
      offset: searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : 0,
    },
  });

  const onSortChange = (value: SortFields) => {
    if (value === SortFields.RATING_DESC) {
      setSearchParams((prev) => {
        prev.delete("sort");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("sort", value);
        return prev;
      });
    }
  };

  const onPaginateChange = (offset: number) => {
    if (offset === 0) {
      setSearchParams((prev) => {
        prev.delete("offset");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("offset", offset + "");
        return prev;
      });
    }
  };

  return (
    <div>
      <ul className="flex items-center gap-2 md:flex-wrap overflow-x-auto mb-6 md:mb-8">
        {filters.brands.map((brand) => (
          <li
            className="p-2 border border-black rounded-lg inline-flex items-center justify-between gap-2 transition-colors hover:border-primary hover:text-primary cursor-pointer"
            key={brand}
            onClick={() => {
              dispatch(
                updateFilters({
                  key: "brands",
                  value: filters.brands.filter((b) => b !== brand),
                })
              );
              searchParams.delete("offset");
            }}
          >
            <span>{`${brand[0].toUpperCase()}${brand.substring(1)}`}</span>
            <Icon name="close-square" className="md:w-6 md:h-6 text-inherit" />
          </li>
        ))}
      </ul>
      <div className="flex items-center md:justify-end gap-4 mb-4 md:mb-6">
        <button
          className="flex-auto p-2 shadow-md bg-white rounded-lg inline-flex items-center gap-2 md:hidden"
          type="button"
          onClick={() => setIsFilterOpen(true)}
        >
          <Icon name="filters" className="w-4 h-4" />
          <span className="font-light">Filters</span>
        </button>
        <Select
          onValueChange={onSortChange}
          defaultValue={searchParams.get("sort") ?? SortFields.RATING_DESC}
        >
          <SelectTrigger className="flex-auto w-auto md:w-full md:max-w-xs">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortFields.RATING_DESC}>Rating</SelectItem>
            <SelectItem value={SortFields.PRICE_ASC}>
              Price: ascending
            </SelectItem>
            <SelectItem value={SortFields.PRICE_DESC}>
              Price: descending
            </SelectItem>
            <SelectItem value={SortFields.IS_NEW_DESC}>New arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-6 mb-4 md:mb-6 items-start">
        <ProductsFilters
          isOpen={isMd || isFilterOpen}
          isMd={isMd}
          onOpen={(open) => setIsFilterOpen(open)}
        />
        <div className="flex-1">
          {loading ? (
            <ul className="flex flex-wrap gap-4 md:gap-6 flex-1 mb-4 md:mb-6 lg:mb-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton
                  className="flex-[0_1_calc(50%-8px)] md:flex-[0_1_calc(33.3%-18px)] rounded-sm h-44 md:h-60 lg:h-80"
                  key={i}
                />
              ))}
            </ul>
          ) : data?.productsCount.length === 0 && !loading ? (
            <Heading as="h3">No results found! Please, try again</Heading>
          ) : (
            <>
              <ul className="flex flex-wrap gap-4 md:gap-6 flex-1 mb-4 md:mb-6 lg:mb-8">
                {data?.products.map((product) => (
                  <li
                    className="flex-[0_1_calc(50%-8px)] md:flex-[0_1_calc(33.3%-18px)]"
                    key={product._id}
                  >
                    <ProductCard product={product as Product} />
                  </li>
                ))}
              </ul>
              <Pagination
                onChange={onPaginateChange}
                limit={PRODUCTS_LIMIT}
                offset={
                  searchParams.get("offset")
                    ? Number(searchParams.get("offset"))
                    : 0
                }
                totalPages={
                  data?.productsCount.length
                    ? Math.ceil(data?.productsCount.length / PRODUCTS_LIMIT)
                    : 1
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
