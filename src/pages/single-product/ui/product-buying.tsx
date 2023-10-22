import { SingleProduct } from "@/shared/api";
import { Button, Icon } from "@/shared/ui";

interface ProductBuyingProps {
  product: SingleProduct;
}

export const ProductBuying = ({ product }: ProductBuyingProps) => {
  return (
    <div className="flex flex-col gap-4 max-w-xs w-full p-6 bg-background shadow-md rounded-lg">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xl font-medium">
            ${product.price.toFixed(2)}
          </span>
          {product.isOnSale && (
            <div className="flex items-center gap-0.5">
              <Icon name="discount" className="w-6 h-6" />
              <span className="font-medium text-secondary">
                -{product.salePercentage?.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        {product.isOnSale && (
          <span className="text-sm font-light text-gray-600">
            last price: ${product.oldPrice?.toFixed(2)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button>Buy Now</Button>
        <Button variant="outline">Add to Cart</Button>
      </div>
    </div>
  );
};
