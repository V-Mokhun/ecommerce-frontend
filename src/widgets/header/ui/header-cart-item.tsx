import { CartProduct } from "@/shared/api";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Icon } from "@/shared/ui";
import {
  decrementProductQuantity,
  deleteProductFromCart,
  incrementProductQuantity,
  useAppDispatch,
} from "@/store";

interface HeaderCartItemProps {
  product: CartProduct;
  quantity: number;
}

export const HeaderCartItem = ({ product, quantity }: HeaderCartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <li className="p-3 md:p-4 bg-white shadow-md flex items-center flex-1 gap-3 md:gap-3">
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
