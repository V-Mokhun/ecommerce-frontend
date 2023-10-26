import { Color, SingleProduct } from "@/shared/api";
import { CART_ROUTE } from "@/shared/consts";
import { Button, Icon } from "@/shared/ui";
import {
  addProductToCart,
  cartProductsSelector,
  changeCartOpenState,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { useNavigate } from "react-router-dom";

interface ProductBuyingProps {
  product: SingleProduct;
  color: Color;
}

export const ProductBuying = ({ product, color }: ProductBuyingProps) => {
  const { colors, ...restProduct } = product;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartProducts = useAppSelector(cartProductsSelector);
  const items = cartProducts.filter((p) => p.product._id === product._id);
  const cartItem = items.find((p) => p.product.color.name === color.name);
  const itemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = () => dispatch(addProductToCart({ ...restProduct, color }));

  return (
    <div className="flex md:flex-col items-center md:items-stretch justify-center gap-4 flex-auto lg:max-w-[240px] lg:w-full p-6 px-3 md:px-6 bg-gray-100 md:bg-background shadow-md rounded-lg fixed left-0 right-0 bottom-0 md:static z-10">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xl font-medium hidden md:block">
            ${product.price.toFixed(2)}
          </span>

          {product.isOnSale && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-600 md:hidden line-through">
                ${product.oldPrice?.toFixed(2)}
              </span>
              <div className="flex items-center gap-0 5">
                <Icon name="discount" className="w-6 h-6" />
                <span className="text-sm md:text-base font-medium text-secondary">
                  -{product.salePercentage?.toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </div>
        {product.isOnSale && (
          <span className="text-sm font-light text-gray-600 hidden md:block">
            last price: ${product.oldPrice?.toFixed(2)}
          </span>
        )}
        <span className="text-xl font-medium md:hidden">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-auto max-w-xs md:max-w-none -order-1 md:order-none">
        <Button
          disabled={product.quantity === 0}
          onClick={() => {
            if (itemsQuantity >= product.quantity) return navigate(CART_ROUTE);

            addToCart();
            navigate(CART_ROUTE);
          }}
        >
          Buy Now
        </Button>
        <Button
          disabled={product.quantity === 0}
          onClick={() => {
            if (cartItem) {
              dispatch(changeCartOpenState(true));
              return;
            }

            addToCart();
          }}
          variant="outline"
        >
          {cartItem ? "Open Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};
