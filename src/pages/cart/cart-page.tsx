import { Container } from "@/shared/ui";
import {
  cartProductsSelector,
  cartTotalPriceSelector,
  useAppSelector,
} from "@/store";
import { useState } from "react";
import { CartCheckout, CartIntro, CartNav, CartPayment } from "./ui";

export enum CartSteps {
  Cart = "Cart",
  Checkout = "Checkout",
  Payment = "Payment",
}

export const CartPage = () => {
  const [activeStep, setActiveStep] = useState<keyof typeof CartSteps>(
    CartSteps.Checkout
  );
  const cartProducts = useAppSelector(cartProductsSelector);
  const totalPrice = useAppSelector(cartTotalPriceSelector);

  return (
    <section className="py-6">
      <Container>
        <CartNav activeStep={activeStep} />
        {activeStep === CartSteps.Cart && (
          <CartIntro
            products={cartProducts}
            totalPrice={totalPrice}
            goNext={() => setActiveStep(CartSteps.Checkout)}
          />
        )}
        {activeStep === CartSteps.Checkout && (
          <CartCheckout
            products={cartProducts}
            totalPrice={totalPrice}
            goNext={() => setActiveStep(CartSteps.Payment)}
            goPrev={() => setActiveStep(CartSteps.Cart)}
          />
        )}
        {activeStep === CartSteps.Payment && (
          <CartPayment
            products={cartProducts}
            totalPrice={totalPrice}
            goPrev={() => setActiveStep(CartSteps.Cart)}
          />
        )}
      </Container>
    </section>
  );
};
