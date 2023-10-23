import { CartProduct } from "@/shared/api";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Icon } from "@/shared/ui";
import {
  decrementProductQuantity,
  deleteProductFromCart,
  incrementProductQuantity,
  useAppDispatch,
} from "@/store";

interface CartItemProps {
  product: CartProduct;
  quantity: number;
  size?: "sm" | "md";
}

export const CartItem = ({ product, quantity, size = "md" }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <li
      className={cn(
        "p-3 md:p-4 bg-white shadow-md flex flex-1 gap-4 md:gap-6",
        size === "sm" && "gap-2 md:gap-4 items-center"
      )}
    >
      <div
        className={cn(
          "h-full w-32 md:w-44 md:h-48 flex-[0_0_8rem] md:flex-[0_0_11rem]",
          size === "sm" &&
            "w-28 md:h-32 md:w-40 flex-[0_0_7rem] md:flex-[0_0_10rem]"
        )}
      >
        <img
          className="object-cover w-full h-full"
          src={imageBuilder(product.mainImage).url()}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col flex-auto justify-between">
        <p
          className={cn(
            "font-medium text-sm md:text-base mb-2",
            size === "md" ? "line-clamp-1 md:line-clamp-none" : "break-words"
          )}
        >
          {product.name}
        </p>
        <div className={cn(size === "md" && "space-y-2")}>
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
              size === "md" ? "mb-4" : "mb-2"
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
          </ul>
        </div>
        <div
          className={cn(
            "flex items-center",
            size === "md"
              ? "flex-col md:flex-row md:justify-between gap-4 md:gap-2"
              : "justify-between gap-2"
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
