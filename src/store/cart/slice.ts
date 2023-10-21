import { CartProduct } from "@/shared/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartStateProduct = { product: CartProduct; quantity: number };

interface CartState {
  isOpen: boolean;
  products: CartStateProduct[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
  isOpen: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    onChange: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product, quantity: 1 });
      }

      state.totalPrice += product.price;
      state.totalQuantity += 1;
    },
    deleteProduct: (state, action: PayloadAction<CartProduct["_id"]>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === productId
      );

      if (existingProduct) {
        state.totalPrice -=
          existingProduct.product.price * existingProduct.quantity;
        state.totalQuantity -= existingProduct.quantity;
        state.products = state.products.filter(
          (p) => p.product._id !== productId
        );
      }
    },
    incrementProductQuantity: (
      state,
      action: PayloadAction<CartProduct["_id"]>
    ) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.totalPrice += existingProduct.product.price;
        state.totalQuantity += 1;
      }
    },
    decrementProductQuantity: (
      state,
      action: PayloadAction<CartProduct["_id"]>
    ) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === productId
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
  onChange: changeCartOpenState,
  addProduct: addProductToCart,
  deleteProduct: deleteProductFromCart,
  decrementProductQuantity,
  incrementProductQuantity,
} = cartSlice.actions;
