import { CartProduct } from "@/shared/api";
import { SINGLE_PRODUCT_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Icon } from "@/shared/ui";
import {
  cartProductsSelector,
  decrementProductQuantity,
  deleteProductFromCart,
  incrementProductQuantity,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { NavLink } from "react-router-dom";

interface CartItemProps {
  product: CartProduct;
  quantity: number;
  size?: "sm" | "md";
  onProductClick?: () => void;
}

export const CartItem = ({
  product,
  quantity,
  size = "md",
  onProductClick,
}: CartItemProps) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(cartProductsSelector);
  const items = cartProducts.filter((p) => p.product._id === product._id);
  const itemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <li
      className={cn(
        "p-2 pl-0 md:p-4 bg-white shadow-md flex flex-1 gap-4 md:gap-6",
        size === "sm"
          ? "gap-2 md:gap-4 items-center"
          : "items-center md:items-stretch",
        product.quantity === 0 && "opacity-50 cursor-not-allowed"
      )}
    >
      <NavLink
        onClick={onProductClick}
        to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
        className={cn(
          "h-auto w-28 md:w-44 md:h-48 flex-[0_0_7rem] md:flex-[0_0_11rem]",
          size === "sm" &&
            "w-28 md:h-32 md:w-40 flex-[0_0_7rem] md:flex-[0_0_10rem]"
        )}
      >
        <img
          className="object-cover w-full h-full"
          src={imageBuilder(product.mainImage).url()}
          alt={product.name}
        />
      </NavLink>
      <div className="flex flex-col flex-auto justify-between">
        <NavLink
          onClick={onProductClick}
          to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
          className={cn(
            "font-medium text-sm md:text-base mb-2",
            size === "md" ? "line-clamp-1 md:line-clamp-none" : "break-words"
          )}
        >
          {product.name}
        </NavLink>
        <NavLink
          onClick={onProductClick}
          to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
          className={cn(size === "md" && "md:space-y-2")}
        >
          <div className="flex items-center gap-1 text-gray-600 font-light md:font-medium text-xs mb-1">
            {size === "md" && (
              <span
                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                style={{ backgroundColor: product.color.value.hex }}
              />
            )}
            <span>{product.color.name}</span>
          </div>
          {size === "sm" && (
            <span className="inline-block text-gray-600 font-light md:font-medium text-xs mb-2 md:mb-4">
              x{quantity}
            </span>
          )}
          <ul
            className={cn(
              "flex flex-col gap-1",
              size === "md" ? "mb-4 md:gap-2" : "mb-2"
            )}
          >
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
            {size === "md" && (
              <li className="flex items-center gap-1 md:font-medium text-xs text-gray-600">
                <Icon
                  name="stock"
                  className={cn(
                    product.isInStock ? "text-primary" : "text-destructive"
                  )}
                />
                <span>
                  {product.isInStock ? "In Stock" : "Currently Unavailable"}
                </span>
              </li>
            )}
          </ul>
        </NavLink>
        <div
          className={cn(
            "flex",
            size === "md"
              ? "flex-col md:items-center md:flex-row md:justify-between gap-4 md:gap-2"
              : "justify-between gap-2 items-center"
          )}
        >
          <div className="flex items-center gap-2">
            {size === "md" && product.oldPrice && (
              <span className="text-xs text-gray-600 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
            <span
              className={cn(
                "text-gray-900",
                size === "sm" && "text-xs font-light"
              )}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={product.quantity === 0}
              onClick={() =>
                dispatch(
                  deleteProductFromCart({
                    id: product._id,
                    color: product.color.name,
                  })
                )
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
                  dispatch(
                    decrementProductQuantity({
                      id: product._id,
                      color: product.color.name,
                    })
                  )
                }
                className="w-4 h-4 inline-flex items-center justify-center disabled:cursor-not-allowed text-2xl hover:text-primary transition-colors"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                disabled={itemsQuantity >= product.quantity}
                onClick={() =>
                  dispatch(
                    incrementProductQuantity({
                      id: product._id,
                      color: product.color.name,
                    })
                  )
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
  );
};
