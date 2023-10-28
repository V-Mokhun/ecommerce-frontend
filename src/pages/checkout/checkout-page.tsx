import { stripePromise } from "@/shared/lib";
import { cartProductsSelector, useAppSelector } from "@/store";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { CheckoutForm } from "./ui";

interface CheckoutPageProps {}

export const CheckoutPage = ({}: CheckoutPageProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const cartProducts = useAppSelector(cartProductsSelector);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartProducts }),
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
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
