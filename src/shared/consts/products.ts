import { ProductFilters } from "../api";

export const MIN_PRICE = 1;
export const MAX_PRICE = 99_999;
export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  brands: [],
  colors: [],
  onSale: false,
  priceMax: MAX_PRICE,
  priceMin: MIN_PRICE,
  ratingMax: MAX_RATING,
  ratingMin: MIN_RATING,
};
