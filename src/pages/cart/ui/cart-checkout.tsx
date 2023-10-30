import { CartStateProduct } from "@/store";
import { CartOrder } from "./cart-order";

interface CartCheckoutProps {
  products: CartStateProduct[];
  totalPrice: number;
  goNext: () => void;
}

export const CartCheckout = ({
  goNext,
  products,
  totalPrice,
}: CartCheckoutProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <div className="flex-auto"></div>
      <CartOrder
        onButtonClick={goNext}
        products={products}
        productsPrice={totalPrice}
        shipmentPrice={7.5}
        totalPrice={totalPrice + 7.5}
      />
    </div>
  );
};
