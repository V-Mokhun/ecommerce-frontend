import { RootState } from "@/store";

export const isCartOpenSelector = (state: RootState) => state.cartModal.isOpen;
