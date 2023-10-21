import { RootState } from "..";

export const isCartOpenSelector = (state: RootState) => state.cart.isOpen;
export const cartQuantitySelector = (state: RootState) =>
  state.cart.totalQuantity;
export const cartProductsSelector = (state: RootState) => state.cart.products;
