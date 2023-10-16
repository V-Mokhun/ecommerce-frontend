import { ProductFilters } from "@/shared/api";
import { DEFAULT_PRODUCT_FILTERS } from "@/shared/consts";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  filters: ProductFilters;
}

const initialState: ProductsState = {
  filters: DEFAULT_PRODUCT_FILTERS,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setFilters } = productsSlice.actions;
