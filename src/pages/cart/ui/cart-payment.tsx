import { stripePromise } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useCartContext } from ".";
import { CartOrder } from "./cart-order";
import { CartPaymentForm } from "./cart-payment-form";

interface CartPaymentProps {
  goPrev: () => void;
}

export const CartPayment = ({ goPrev }: CartPaymentProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { cartProducts, selectedShipping } = useCartContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_STRIPE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartProducts.map(({ product, quantity }) => ({
          price: product.price,
          quantity,
        })),
        shippingPrice: selectedShipping?.price ?? 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0b68f4",
        colorText: "#000000",
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div className="flex-1 w-full md:flex-auto md:w-auto">
        <div className="md:px-6 md:py-4 lg:px-8 lg:py-6 md:border border-gray-200 rounded-lg">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CartPaymentForm />
            </Elements>
          )}
        </div>
        <Button onClick={goPrev} variant="text">
          Return to checkout
        </Button>
      </div>
      <CartOrder hideButton />
    </div>
  );
};
