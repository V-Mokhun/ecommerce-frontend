import { SINGLE_PRODUCT_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { imageBuilder } from "@/shared/lib/image-builder";
import { Button } from "@/shared/ui";
import { CartStateProduct } from "@/store";
import { NavLink } from "react-router-dom";

interface CartOrderProps {
  products: CartStateProduct[];
  productsPrice: number;
  shipmentPrice: number;
  totalPrice: number;
  onButtonClick: () => void;
}

export const CartOrder = ({
  products,
  productsPrice,
  shipmentPrice,
  totalPrice,
  onButtonClick,
}: CartOrderProps) => {
  return (
    <div className="md:p-4 lg:p-6 md:border border-gray-200 flex flex-col flex-1 w-full md:flex-[0_1_400px] md:w-auto">
      <h2 className="text-base font-medium mb-3 md:text-xl md:mb-4 lg:text-2xl">
        Your Order
      </h2>
      <ul className="flex overflow-x-auto md:flex-col gap-3 md:gap-4 mb-6 md:mb-8 lg:mb-10 rounded-lg bg-gray-100 md:bg-background p-2 md:p-0 -mr-4 md:mr-0 md:max-h-[40vh] md:overflow-y-auto">
        {products.map(({ product, quantity }) => (
          <li key={product._id + product.color.name}>
            <NavLink
              to={`${SINGLE_PRODUCT_ROUTE}/${product.slug.current}`}
              className="group flex flex-col md:flex-row gap-2 p-1 md:p-1.5 md:border-b border-gray-100 rounded-sm bg-background"
            >
              <div className="w-20 h-[60px] md:h-[74px] md:w-[88px] md:flex-[0_0_88px] flex justify-center items-center">
                <img
                  className="object-cover h-full"
                  src={imageBuilder(product.mainImage).url()}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col flex-auto">
                <p className="group-hover:text-primary transition-colors hidden md:block line-clamp-1 text-xs font-light mb-2 text-gray-900">
                  {product.name}
                </p>
                <div className="flex flex-col md:flex-col-reverse gap-2 md:gap-1 md:font-medium text-xs md:text-xxs text-gray-600 md:mb-2">
                  <span className="pl-2 md:pl-0">x{quantity}</span>
                  <div className="flex items-center gap-1 p-1 md:p-0">
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full md:hidden",
                        product.color.name === "White" && "border"
                      )}
                      style={{ backgroundColor: product.color.value.hex }}
                    />
                    <span>{product.color.name}</span>
                  </div>
                </div>
                <div className="hidden md:block mt-auto text-right font-light text-xs text-gray-900">
                  <span>${product.price.toFixed(2)} </span>
                  {product.oldPrice && (
                    <span className="text-gray-600">
                      from ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mb-6 md:mb-8 lg:mb-10">
        <h3 className="font-medium mb-3 md:hidden">Payment details</h3>
        <div className="p-2">
          <ul className="flex flex-col gap-2 mb-3 pb-3 border-b border-gray-300">
            <li className="flex items-center justify-between gap-2 text-xs font-light md:text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="text-right">${productsPrice.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between gap-2 text-xs font-light md:text-sm text-gray-600">
              <span>Shipment cost</span>
              <span className="text-right">${shipmentPrice.toFixed(2)}</span>
            </li>
          </ul>
          <div className="flex items-center justify-between text-sm md:text-base font-medium gap-2">
            <h3>Grand Total</h3>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button onClick={onButtonClick} className="w-full">
        Continue to pay
      </Button>
    </div>
  );
};
