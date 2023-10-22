import { SingleProduct } from "@/shared/api";
import { Button, Icon } from "@/shared/ui";

interface ProductBuyingProps {
  product: SingleProduct;
}

export const ProductBuying = ({ product }: ProductBuyingProps) => {
  return (
    <div className="flex lg:flex-col items-center lg:items-stretch justify-center gap-4 lg:max-w-[240px] w-full p-6 px-3 lg:px-6 bg-gray-100 lg:bg-background shadow-md rounded-lg fixed left-0 right-0 bottom-0 lg:static z-10">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xl font-medium hidden lg:block">
            ${product.price.toFixed(2)}
          </span>

          {product.isOnSale && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-600 lg:hidden line-through">
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
          <span className="text-sm font-light text-gray-600 hidden lg:block">
            last price: ${product.oldPrice?.toFixed(2)}
          </span>
        )}
        <span className="text-xl font-medium lg:hidden">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-auto max-w-xs lg:max-w-none -order-1 lg:order-none">
        <Button>Buy Now</Button>
        <Button variant="outline">Add to Cart</Button>
      </div>
    </div>
  );
};
