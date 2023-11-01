import { Shipping } from "@/shared/api";
import {
  CartStateProduct,
  cartProductsSelector,
  cartTotalPriceSelector,
  useAppSelector,
} from "@/store";
import { createContext, useContext, useState } from "react";

export type CartContextState = {
  selectedShipping: Shipping | undefined;
  setSelectedShipping: (shipping: Shipping) => void;
  cartProducts: CartStateProduct[];
  productsPrice: number;
};

export const CartContext = createContext<CartContextState | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedShipping, setSelectedShipping] = useState<
    Shipping | undefined
  >(undefined);
  const cartProducts = useAppSelector(cartProductsSelector);
  const totalPrice = useAppSelector(cartTotalPriceSelector);

  return (
    <CartContext.Provider
      value={{
        selectedShipping,
        setSelectedShipping,
        cartProducts,
        productsPrice: totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCartContext must be used within CartContextProvider");
  }

  return cartContext;
};
