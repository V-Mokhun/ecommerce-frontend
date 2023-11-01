import { Container } from "@/shared/ui";
import { useState } from "react";
import {
  CartCheckout,
  CartContextProvider,
  CartIntro,
  CartNav,
  CartPayment,
} from "./ui";

export enum CartSteps {
  Cart = "Cart",
  Checkout = "Checkout",
  Payment = "Payment",
}

export const CartPage = () => {
  const [activeStep, setActiveStep] = useState<keyof typeof CartSteps>(
    CartSteps.Checkout
  );

  return (
    <CartContextProvider>
      <section className="py-6">
        <Container>
          <CartNav activeStep={activeStep} />
          {activeStep === CartSteps.Cart && (
            <CartIntro goNext={() => setActiveStep(CartSteps.Checkout)} />
          )}
          {activeStep === CartSteps.Checkout && (
            <CartCheckout
              goNext={() => setActiveStep(CartSteps.Payment)}
              goPrev={() => setActiveStep(CartSteps.Cart)}
            />
          )}
          {activeStep === CartSteps.Payment && (
            <CartPayment goPrev={() => setActiveStep(CartSteps.Checkout)} />
          )}
        </Container>
      </section>
    </CartContextProvider>
  );
};
