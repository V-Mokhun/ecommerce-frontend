import { CartItem } from "@/entities";
import { CART_ROUTE } from "@/shared/consts";
import { useMediaQuery } from "@/shared/lib/hooks";
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  buttonVariants,
} from "@/shared/ui";
import {
  cartProductsSelector,
  cartQuantitySelector,
  cartTotalPriceSelector,
  changeCartOpenState,
  isCartOpenSelector,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { NavLink } from "react-router-dom";

interface HeaderCartProps {}

export const HeaderCart = ({}: HeaderCartProps) => {
  const cartQuantity = useAppSelector(cartQuantitySelector);
  const cartTotalPrice = useAppSelector(cartTotalPriceSelector);
  const isOpen = useAppSelector(isCartOpenSelector);
  const products = useAppSelector(cartProductsSelector);
  const dispatch = useAppDispatch();
  const isMd = useMediaQuery("(min-width:768px)");

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        dispatch(changeCartOpenState(open));
        if (!isMd)
          open
            ? document.body.classList.add("overflow-hidden")
            : document.body.classList.remove("overflow-hidden");
      }}
    >
      <PopoverTrigger className="p-2 relative">
        <Icon name="cart" className="w-6 h-6" />
        <span className="text-xs md:text-sm absolute inline-flex justify-center items-center w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full right-0.5 bottom-0 text-white font-light">
          {cartQuantity > 9 ? "9+" : cartQuantity}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen h-[calc(100vh-92px)] flex flex-col mt-5 md:mt-0 border-none md:border-t rounded-none md:rounded-md shadow-none md:shadow-md md:w-[512px] md:h-auto pb-0 px-0"
        sideOffset={28.5}
      >
        {cartQuantity > 0 ? (
          <>
            <p className="font-medium mb-2 md:mb-3 md:font-light md:text-lg px-4">
              {cartQuantity} item{cartQuantity !== 1 && "s"}
            </p>
            <ul className="flex flex-col gap-2 md:gap-3 max-h-[60vh] overflow-y-auto px-4 py-2">
              {products.map(({ product, quantity }) => (
                <CartItem
                  onProductClick={() => dispatch(changeCartOpenState(false))}
                  size="sm"
                  product={product}
                  quantity={quantity}
                  key={product._id + product.color.name}
                />
              ))}
            </ul>
            <div className="flex items-center justify-between gap-6 py-5 md:pt-3 px-4 bg-gray-100 md:bg-transparent fixed bottom-0 left-0 right-0 md:static">
              <div className="flex flex-col text-center">
                <span className="text-xs md:text-sm font-light text-gray-900 whitespace-nowrap">
                  Grand total
                </span>
                <span className="text-sm md:text-base font-medium text-gray-900">
                  ${cartTotalPrice.toFixed(2)}
                </span>
              </div>
              <NavLink
                to={CART_ROUTE}
                onClick={() => dispatch(changeCartOpenState(false))}
                className={buttonVariants({
                  className: "gap-2 w-full h-10 md:h-auto",
                })}
              >
                <span>Proceed to Cart</span>
                <Icon name="shopping-cart" className="md:w-6 md:h-6" />
              </NavLink>
            </div>
          </>
        ) : (
          <p className="text-xl font-medium px-2 pb-4">Your cart is empty.</p>
        )}
      </PopoverContent>
    </Popover>
  );
};
