import { ProductFilters, SortFields } from "@/shared/api";
import { ProductSorting, SortOrder } from "@/shared/api/generated/graphql";
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

  return filters;
};
