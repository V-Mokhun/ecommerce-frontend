import { CartStateProduct } from "@/store";
import { CartOrder } from "./cart-order";
import { Button } from "@/shared/ui";

interface CartCheckoutProps {
  products: CartStateProduct[];
  totalPrice: number;
  goNext: () => void;
  goPrev: () => void;
}

export const CartCheckout = ({
  goNext,
  goPrev,
  products,
  totalPrice,
}: CartCheckoutProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div className="flex-auto">
        <div className="md:px-6 md:py-4 lg:px-8 lg:py-6 border border-gray-200 rounded-lg">
          <h2 className="font-medium md:text-lg lg:text-xl mb-2">
            Address details
          </h2>
        </div>
        <Button onClick={goPrev} variant="text">
          Return to cart
        </Button>
      </div>
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
