import { RootState } from "..";

export const isCartOpenSelector = (state: RootState) => state.cart.isOpen;
export const cartQuantitySelector = (state: RootState) =>
  state.cart.totalQuantity;
export const cartTotalPriceSelector = (state: RootState) =>
  state.cart.totalPrice;
export const cartProductsSelector = (state: RootState) => state.cart.products;
