import { CartItem } from "@/entities";
import { PRODUCTS_ROUTE } from "@/shared/consts";
import { Button, Heading, buttonVariants } from "@/shared/ui";
import { NavLink } from "react-router-dom";
import { useCartContext } from ".";

interface CartIntroProps {
  goNext: () => void;
}

export const CartIntro = ({ goNext }: CartIntroProps) => {
  const { cartProducts, productsPrice } = useCartContext();

  return cartProducts.length > 0 ? (
    <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-6">
      <ul className="w-full md:w-auto flex flex-col md:flex-[0_1_700px]">
        {cartProducts.map(({ product, quantity }) => (
          <CartItem
            key={product._id + product.color.name}
            product={product}
            quantity={quantity}
          />
        ))}
      </ul>
      <div className="p-2 md:p-4 md:bg-background md:shadow-md flex flex-col gap-4 md:rounded-lg md:border md:border-gray-200 flex-auto max-w-xs flex-shrink-0 w-full md:w-auto">
        <h2 className="font-medium lg:text-xl text-2xl hidden md:block">
          Payment Details
        </h2>
        <div className="flex items-center justify-between font-medium text-sm md:text-base px-2 md:px-0">
          <span>Grand Total</span>
          <span>${productsPrice.toFixed(2)}</span>
        </div>

        <Button
          onClick={goNext}
          className={buttonVariants({ className: "w-full" })}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  ) : (
    <>
      <Heading className="mb-4" as="h3">
        Your cart is empty
      </Heading>
      <NavLink className="text-primary hover:underline" to={PRODUCTS_ROUTE}>
        Discover products
      </NavLink>
    </>
  );
};
