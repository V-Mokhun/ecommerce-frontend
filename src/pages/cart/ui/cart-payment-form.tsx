import { CART_ROUTE, HOME_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { Button, Dialog, DialogContent, toast } from "@/shared/ui";
import { clearCart, useAppDispatch } from "@/store";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Check, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from ".";

interface CartPaymentFormProps {}

export const CartPaymentForm = ({}: CartPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { updateCheckoutInfo, checkoutInfo, productsPrice, selectedShipping } =
    useCartContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);
  const [transactionId, setTranscationId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    updateCheckoutInfo({
      email,
      fullName: checkoutInfo?.fullName ?? "",
      phoneNumber: checkoutInfo?.phoneNumber ?? "",
    });
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${import.meta.env.VITE_SITE_URL}${CART_ROUTE}`,
        receipt_email: email,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent) {
      setTranscationId(paymentIntent.id);

      if (paymentIntent.status === "succeeded") {
        setIsModalOpen(true);
        setPaymentStatus("success");

        elements.getElement("payment")?.clear();
        elements.getElement("linkAuthentication")?.clear();
      } else if (paymentIntent.status === "requires_payment_method") {
        setIsModalOpen(true);
        setPaymentStatus("error");

        elements.getElement("payment")?.clear();
        elements.getElement("linkAuthentication")?.clear();
      }
    }

    setIsLoading(false);
  };

  const handleModalClose = () => {
    if (paymentStatus === "success") {
      updateCheckoutInfo(undefined);
      dispatch(clearCart());
      toast({
        title: "Order placed!",
        description: "We sent you an email with your order details.",
      });
      navigate(HOME_ROUTE);
    } else if (paymentStatus === "error") {
      setTimeout(() => {
        setPaymentStatus(null);
        setTranscationId("");
      }, 500);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) handleModalClose();
        }}
      >
        <DialogContent
          className="lg:max-w-lg"
          closeClassName="static flex justify-end gap-2"
        >
          <div className="w-32 h-32 rounded-full bg-background shadow-sm inline-flex justify-center items-center mb-2 mx-auto">
            {paymentStatus === "success" && (
              <Check className="w-32 h-32 text-success" />
            )}
            {paymentStatus === "error" && (
              <X className="w-32 h-32 text-destructive" />
            )}
          </div>
          <p
            className={cn(
              "font-medium mb-4 text-2xl md:text-3xl text-center",
              paymentStatus === "success" && "text-success",
              paymentStatus === "error" && "text-destructive"
            )}
          >
            {paymentStatus === "success" && "Payment successful!"}
            {paymentStatus === "error" && "Payment failed."}
          </p>
          {paymentStatus === "success" && (
            <ul className="space-y-4 font-light text-gray-700">
              <li className="flex gap-2 justify-between items-center">
                <span>Full name</span>
                <span>{checkoutInfo?.fullName}</span>
              </li>
              <li className="flex gap-2 justify-between items-center">
                <span>Phone number</span>
                <span>{checkoutInfo?.phoneNumber}</span>
              </li>
              <li className="flex gap-2 justify-between items-center">
                <span>Email</span>
                <span>{checkoutInfo?.email}</span>
              </li>
              <li className="flex gap-2 justify-between items-center">
                <span>Transaction id</span>
                <span>{transactionId}</span>
              </li>
              <li className="flex gap-2 justify-between items-center font-medium">
                <span>Amount paid</span>
                <span>
                  ${(productsPrice + (selectedShipping?.price ?? 0)).toFixed(2)}
                </span>
              </li>
            </ul>
          )}
          {paymentStatus === "error" && (
            <p className="md:text-lg font-light text-gray-700">
              We are sorry, there was an error processing your payment. Please,
              try again later.
            </p>
          )}
          <div className="flex justify-end mt-4">
            <Button
              className="min-w-[160px]"
              onClick={() => {
                setIsModalOpen(false);
                handleModalClose();
              }}
            >
              {paymentStatus === "success" ? "Close" : "Try again"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
        <PaymentElement options={paymentElementOptions} />
        <div className="text-right mt-4 md:mt-6">
          <Button disabled={isLoading || !stripe || !elements} type="submit">
            Pay Now
          </Button>
        </div>
        {message && (
          <p className="mt-4 text-lg font-medium text-destructive">{message}</p>
        )}
      </form>
    </>
  );
};
