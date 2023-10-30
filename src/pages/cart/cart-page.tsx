import { CartItem } from "@/entities";
import { CHECKOUT_ROUTE, HOME_ROUTE } from "@/shared/consts";
import { Button, Container, Heading, buttonVariants } from "@/shared/ui";
import {
  cartProductsSelector,
  cartTotalPriceSelector,
  useAppSelector,
} from "@/store";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartCheckout, CartIntro, CartNav } from "./ui";

export enum CartSteps {
  Cart = "Cart",
  Checkout = "Checkout",
  Payment = "Payment",
}

export const CartPage = () => {
  const [activeStep, setActiveStep] = useState<keyof typeof CartSteps>(
    CartSteps.Cart
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
            goNext={() => setActiveStep(CartSteps.Checkout)}
          />
        )}
      </Container>
    </section>
  );
};
