import { CartProduct } from "@/shared/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartStateProduct = { product: CartProduct; quantity: number };

interface CartState {
  products: CartStateProduct[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) =>
          p.product._id === product._id &&
          p.product.color.name === product.color.name
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product, quantity: 1 });
      }

      state.totalPrice += product.price;
      state.totalQuantity += 1;
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ id: CartProduct["_id"]; color: string }>
    ) => {
      const { id, color } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === id && p.product.color.name === color
      );
      const productIdx = state.products.findIndex(
        (p) => p.product._id === id && p.product.color.name === color
      );

      if (existingProduct) {
        state.totalPrice -=
          existingProduct.product.price * existingProduct.quantity;
        state.totalQuantity -= existingProduct.quantity;

        state.products = state.products
          .slice(0, productIdx)
          .concat(state.products.slice(productIdx + 1));
      }
    },
    incrementProductQuantity: (
      state,
      action: PayloadAction<{ id: CartProduct["_id"]; color: string }>
    ) => {
      const { id, color } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === id && p.product.color.name === color
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.totalPrice += existingProduct.product.price;
        state.totalQuantity += 1;
      }
    },
    decrementProductQuantity: (
      state,
      action: PayloadAction<{ id: CartProduct["_id"]; color: string }>
    ) => {
      const { id, color } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === id && p.product.color.name === color
      );

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.totalPrice -= existingProduct.product.price;
        state.totalQuantity -= 1;
      }
    },
  },
});

export const {
  addProduct: addProductToCart,
  deleteProduct: deleteProductFromCart,
  decrementProductQuantity,
  incrementProductQuantity,
} = cartSlice.actions;
