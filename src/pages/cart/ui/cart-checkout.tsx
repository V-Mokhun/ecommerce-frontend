import { GET_SHIPPINGS, Shipping } from "@/shared/api";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  useToast,
} from "@/shared/ui";
import { CartStateProduct } from "@/store";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { CartOrder } from "./cart-order";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";
import { useCartContext } from ".";

interface CartCheckoutProps {
  goNext: () => void;
  goPrev: () => void;
}

const formSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Full Name must be at least 5 characters" })
    .max(120, { message: "Full Name must be at most 120 characters" }),
  phoneNumber: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
      message: "Phone number must be valid",
    }),
  country: z
    .string()
    .min(2, { message: "Country name must be at least 2 characters" }),
  city: z
    .string()
    .min(2, { message: "City name must be at least 2 characters" }),
  street: z
    .string()
    .min(5, { message: "Street address must be at least 5 characters" }),
  postalCode: z
    .string()
    .min(2, { message: "Postal code must be at least 2 characters" }),
});

export const CartCheckout = ({ goNext, goPrev }: CartCheckoutProps) => {
  const {
    selectedShipping,
    setSelectedShipping,
    updateCheckoutInfo,
    checkoutInfo,
  } = useCartContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: checkoutInfo?.fullName ?? "",
      phoneNumber: checkoutInfo?.phoneNumber ?? "",
      country: checkoutInfo?.country ?? "",
      city: checkoutInfo?.city ?? "",
      street: checkoutInfo?.street ?? "",
      postalCode: checkoutInfo?.postalCode ?? "",
    },
  });
  const { data } = useQuery(GET_SHIPPINGS);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedShipping && data?.allShipping[0]) {
      setSelectedShipping(data.allShipping[0] as Shipping);
    }
  }, [data?.allShipping, selectedShipping]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateCheckoutInfo({ ...values });
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div className="flex-1 w-full md:flex-auto md:w-auto">
        <div className="md:px-6 md:py-4 lg:px-8 lg:py-6 md:border border-gray-200 rounded-lg">
          <h2 className="font-medium md:text-lg lg:text-xl mb-2 md:mb-3">
            Address details
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mb-4 md:mb-6 lg:mb-8"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onClear={() => field.onChange("")}
                        placeholder="Full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onClear={() => field.onChange("")}
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 md:gap-4 lg:gap-5">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex-auto">
                      <FormControl>
                        <Input
                          onClear={() => field.onChange("")}
                          placeholder="Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-auto">
                      <FormControl>
                        <Input
                          onClear={() => field.onChange("")}
                          placeholder="City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onClear={() => field.onChange("")}
                        placeholder="Street name and house number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onClear={() => field.onChange("")}
                        placeholder="Postal code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <h2 className="font-medium md:text-lg lg:text-xl mb-2 md:mb-3">
            Shipping Method
          </h2>
          <ul className="space-y-2">
            {data?.allShipping.map((shipping) => (
              <li key={shipping._id}>
                <input
                  type="radio"
                  id={shipping.name!}
                  name="shipping"
                  value={shipping.name!}
                  checked={shipping.name === selectedShipping?.name}
                  onChange={(e) => {
                    setSelectedShipping(shipping as Shipping);
                  }}
                  className="sr-only peer"
                />
                <label
                  className="flex gap-2 md:gap-3 font-light cursor-pointer text-gray-700 text-xs md:text-sm p-2 rounded-lg border border-transparent bg-gray-100 peer-checked:bg-primary-25 peer-checked:border-primary-75 transition-colors"
                  htmlFor={shipping.name!}
                >
                  <span
                    className={cn(
                      "w-5 h-5 relative rounded-full bg-transparent flex items-center justify-center border border-gray-600 transition-colors after:block after:w-3.5 after:h-3.5 after:rounded-full after:bg-transparent after:transition-colors",
                      shipping.name === selectedShipping?.name &&
                        "border-primary after:bg-primary"
                    )}
                  />
                  <div className="flex flex-col flex-auto gap-1">
                    <span className="text-sm md:text-base text-black">
                      {shipping.name}
                    </span>
                    <span>{shipping.description}</span>
                  </div>
                  <span className="flex items-end">
                    ${shipping.price!.toFixed(2)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={goPrev} variant="text">
          Return to cart
        </Button>
      </div>
      <CartOrder
        onButtonClick={async () => {
          const isValid = await form.trigger();

          if (!isValid || !selectedShipping) {
            await form.handleSubmit(onSubmit)();
            toast({
              title: `You must fill all fields providing address details ${
                !selectedShipping ? "and select shipping method" : ""
              }`,
              variant: "destructive",
            });
          } else {
            await form.handleSubmit(onSubmit)();
            goNext();
          }
        }}
      />
    </div>
  );
};
