import { CartStateProduct } from "@/store";
import { CartOrder } from "./cart-order";
import { Button } from "@/shared/ui";

interface CartPaymentProps {
  goPrev: () => void;
}

export const CartPayment = ({ goPrev }: CartPaymentProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div className="flex-1 w-full md:flex-auto md:w-auto">
        <Button onClick={goPrev} variant="text">
          Return to checkout
        </Button>
      </div>
      <CartOrder onButtonClick={() => {}} />
    </div>
  );
};