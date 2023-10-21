import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartModalState {
  isOpen: boolean;
}

const initialState: CartModalState = { isOpen: false };

export const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    onChange: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { onChange: changeCartOpenState } = cartModalSlice.actions;
