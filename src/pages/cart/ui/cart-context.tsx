import { Shipping } from "@/shared/api";
import {
  CartStateProduct,
  cartProductsSelector,
  cartTotalPriceSelector,
  useAppSelector,
} from "@/store";
import { createContext, useContext, useState } from "react";

type CheckoutInfo = { fullName: string; email: string; phoneNumber: string };

export type CartContextState = {
  selectedShipping: Shipping | undefined;
  setSelectedShipping: (shipping: Shipping) => void;
  cartProducts: CartStateProduct[];
  productsPrice: number;
  checkoutInfo: CheckoutInfo | undefined;
  updateCheckoutInfo: (checkoutInfo: CheckoutInfo | undefined) => void;
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
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo | undefined>(
    undefined
  );
  const cartProducts = useAppSelector(cartProductsSelector);
  const totalPrice = useAppSelector(cartTotalPriceSelector);

  return (
    <CartContext.Provider
      value={{
        selectedShipping,
        setSelectedShipping,
        checkoutInfo,
        updateCheckoutInfo: setCheckoutInfo,
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
