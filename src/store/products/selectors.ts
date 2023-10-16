import { RootState } from "..";

export const productsFiltersSelector = (state: RootState) =>
  state.products.filters;
