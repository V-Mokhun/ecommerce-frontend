import { CART_ROUTE } from "@/shared/consts";
import { useMediaQuery } from "@/shared/lib/hooks";
import { imageBuilder } from "@/shared/lib/image-builder";
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
  decrementProductQuantity,
  deleteProductFromCart,
  incrementProductQuantity,
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
        <span className="text-xs md:text-base absolute inline-flex justify-center items-center w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full right-0.5 bottom-0 text-white font-light">
          {cartQuantity}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen h-[calc(100vh-96px)] flex flex-col mt-4 md:mt-0 border-none md:border-t rounded-none md:rounded-md shadow-none md:shadow-md md:w-[512px] md:h-auto pb-0"
        sideOffset={28.5}
      >
        <p className="font-medium mb-4 md:mb-5 md:font-light md:text-lg">
          {cartQuantity} item{cartQuantity > 1 && "s"}
        </p>
        <ul className="flex flex-col gap-2 md:gap-3 max-h-[60vh] overflow-y-auto">
          {products.map(({ product, quantity }) => (
            <li
              className="p-3 md:p-4 bg-white shadow-md flex items-center flex-1 gap-3 md:gap-3"
              key={product._id}
            >
              <div className="h-full w-28 md:h-32 md:w-40 flex-[0_0_7rem] md:flex-[0_0_10rem]">
                <img
                  className="object-cover w-full h-full"
                  src={imageBuilder(product.mainImage).url()}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col flex-auto">
                <p className="font-medium text-sm md:text-base mb-2 break-words">
                  {product.name}
                </p>
                <span className="text-gray-600 font-light md:font-medium text-xs mb-1">
                  {product.color.name}
                </span>
                <span className="text-gray-600 font-light md:font-medium text-xs mb-2 md:mb-4">
                  x{quantity}
                </span>
                <ul className="flex flex-col gap-1 mb-2">
                  {product.isFreeDelivery && (
                    <li className="flex items-center gap-1 md:font-medium text-xs text-gray-600">
                      <Icon name="delivery" className="text-primary" />
                      <span>Free Delivery</span>
                    </li>
                  )}
                  {product.isGuaranteed && (
                    <li className="flex items-center gap-1 md:font-medium text-xs text-gray-600">
                      <Icon name="guaranteed" className="text-primary" />
                      <span>Guaranteed</span>
                    </li>
                  )}
                </ul>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-light text-xs text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        dispatch(deleteProductFromCart(product._id))
                      }
                      className="text-destructive"
                      type="button"
                    >
                      <Icon name="trash" />
                    </button>
                    <div className="flex items-center font-light text-gray-600 p-1 border-b border-b-gray-600 gap-3">
                      <button
                        disabled={quantity <= 1}
                        onClick={() =>
                          dispatch(decrementProductQuantity(product._id))
                        }
                        className="w-4 h-4 inline-flex items-center justify-center disabled:cursor-not-allowed text-2xl hover:text-primary transition-colors"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(incrementProductQuantity(product._id))
                        }
                        className="w-4 h-4 inline-flex items-center justify-center text-2xl hover:text-primary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-6 py-5 md:pt-3 -mx-4 px-4 bg-gray-100 md:bg-transparent fixed bottom-0 left-4 right-4 md:static">
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
      </PopoverContent>
    </Popover>
  );
};
