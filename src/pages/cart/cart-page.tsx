import { CartItem } from "@/entities";
import { HOME_ROUTE } from "@/shared/consts";
import { Container, Heading, Section } from "@/shared/ui";
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
    <Section>
      <Container>
        <Heading className="mb-6 md:mb-8" as="h2">
          Your Cart
        </Heading>
        {cartProducts.length > 0 ? (
          <ul className="flex flex-col">
            {cartProducts.map(({ product, quantity }) => (
              <CartItem
                key={product._id}
                product={product}
                quantity={quantity}
              />
            ))}
          </ul>
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
    </Section>
  );
};
