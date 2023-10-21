import { imageBuilder } from "@/shared/lib/image-builder";
import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import {
  cartProductsSelector,
  cartQuantitySelector,
  changeCartOpenState,
  isCartOpenSelector,
  useAppDispatch,
  useAppSelector,
} from "@/store";

interface HeaderCartProps {}

export const HeaderCart = ({}: HeaderCartProps) => {
  const cartQuantity = useAppSelector(cartQuantitySelector);
  const isOpen = useAppSelector(isCartOpenSelector);
  const products = useAppSelector(cartProductsSelector);
  const dispatch = useAppDispatch();

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => dispatch(changeCartOpenState(open))}
    >
      <PopoverTrigger className="p-2 relative">
        <Icon name="cart" className="w-6 h-6" />
        <span className="text-xs md:text-base absolute inline-flex justify-center items-center w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full right-0.5 bottom-0 text-white font-light">
          {cartQuantity}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="md:w-[512px] max-h-[70vh] overflow-y-auto"
        sideOffset={28.5}
      >
        <p className="font-medium mb-4 md:mb-5 md:font-light md:text-lg">
          {cartQuantity} item{cartQuantity > 1 && "s"}
        </p>
        <ul className="flex flex-col gap-2 md:gap-3">
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
                <div className="flex items-center justify-between gap-2"></div>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
