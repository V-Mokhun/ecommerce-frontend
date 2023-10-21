import { ProductFilters, SortFields } from "@/shared/api";
import {
  ProductFilter,
  ProductSorting,
  SortOrder,
} from "@/shared/api/generated/graphql";
import { DEFAULT_PRODUCT_FILTERS } from "@/shared/consts";
import { URLSearchParams } from "url";

export const parseSortFromSearchParams = (
  params: URLSearchParams
): ProductSorting => {
  const sort = params.get("sort");

  if (!sort || sort === SortFields.RATING_DESC)
    return { rating: SortOrder.Desc };
  else if (sort === SortFields.PRICE_ASC) return { price: SortOrder.Asc };
  else if (sort === SortFields.PRICE_DESC) return { price: SortOrder.Desc };
  else if (sort === SortFields.IS_NEW_DESC) return { isNew: SortOrder.Desc };

  return { rating: SortOrder.Desc };
};

export const parseFiltersFromSearchParams = (
  params: URLSearchParams
): ProductFilters => {
  const filters = { ...DEFAULT_PRODUCT_FILTERS };

  for (const key of Object.keys(filters) as Array<keyof ProductFilters>) {
    const value = params.get(key);

    if (key === "brands") {
      filters[key] = value ? value.split(",") : [];
    } else if (key === "onSale") {
      filters[key] = value === "true";
    } else {
      if (value) filters[key] = Number(value);
    }
  }

  return filters;
};

export const stringifyFiltersToSearchParams = (
  filters: ProductFilters,
  params: URLSearchParams
) => {
  for (const key of Object.keys(filters) as Array<keyof ProductFilters>) {
    if (!filters[key]) {
      params.delete(key);
      continue;
    }

    if (key === "brands") {
      if (filters[key] && filters[key]!.length > 0)
        params.set(key, filters[key]!.join(","));
      else params.delete(key);
    } else {
      if (filters[key] === DEFAULT_PRODUCT_FILTERS[key]) params.delete(key);
      else params.set(key, String(filters[key]));
    }
  }

  return params;
};

export const makeFiltersQuery = (filters: ProductFilters) => {
  const filtersQuery: ProductFilter = {
    price: {
      lte: filters.priceMax,
      gte: filters.priceMin,
    },
    rating: {
      lte: filters.ratingMax,
      gte: filters.ratingMin,
    },
  };

  if (filters.onSale) {
    filtersQuery.isOnSale = { eq: true };
  }

  if (filters.brands.length > 0) {
    filtersQuery.brand = { slug: { current: { in: filters.brands } } };
  }

  return filtersQuery;
};
