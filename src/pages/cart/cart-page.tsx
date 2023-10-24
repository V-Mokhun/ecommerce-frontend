import { CartItem } from "@/entities";
import { HOME_ROUTE } from "@/shared/consts";
import { Button, Container, Heading } from "@/shared/ui";
import {
  cartProductsSelector,
  cartTotalPriceSelector,
  useAppSelector,
} from "@/store";
import { NavLink } from "react-router-dom";

interface CartPageProps {}

export const CartPage = ({}: CartPageProps) => {
  const cartProducts = useAppSelector(cartProductsSelector);
  const totalPrice = useAppSelector(cartTotalPriceSelector);

  return (
    <section className="py-6">
      <Container>
        <Heading className="mb-6 md:mb-8" as="h2">
          Your Cart
        </Heading>
        {cartProducts.length > 0 ? (
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-6">
            <ul className="w-full md:w-auto flex flex-col md:flex-[0_1_700px]">
              {cartProducts.map(({ product, quantity }) => (
                <CartItem
                  key={product._id}
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
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full">Proceed to checkout</Button>
            </div>
          </div>
        ) : (
          <>
            <Heading className="mb-4" as="h3">
              Your cart is empty
            </Heading>
            <NavLink className="text-primary hover:underline" to={HOME_ROUTE}>
              Discover products
            </NavLink>
          </>
        )}
      </Container>
    </section>
  );
};
