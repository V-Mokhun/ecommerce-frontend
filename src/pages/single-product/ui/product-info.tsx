import { Color, SingleProduct } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import { Check } from "lucide-react";

interface ProductInfoProps {
  product: SingleProduct;
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}

export const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
}: ProductInfoProps) => {
  return (
    <div className="flex flex-[1_1_100%] flex-col lg:gap-6 order-3 lg:flex-auto lg:order-none">
      <div className="mb-3 lg:mb-0">
        <h1 className="text-base md:text-lg lg:text-xl font-medium mb-2">
          {product.name}
        </h1>
        <div className="py-1 px-2 bg-primary-500 text-xs font-medium text-white inline-flex items-center rounded-sm gap-0.5">
          <Icon className="text-white" name="star" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
      <ul
        className={cn(
          "flex items-center flex-wrap gap-4 mb-3 lg:mb-0",
          product.isGuaranteed && product.isFreeDelivery && "justify-between"
        )}
      >
        {product.isInStock ? (
          <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
            <Icon name="stock" className="w-5 h-5 text-primary" />
            <span>In Stock</span>
          </li>
        ) : (
          <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
            <Icon name="stock" className="w-5 h-5 text-destructive" />
            <span>Unavailable</span>
          </li>
        )}
        {product.isGuaranteed && (
          <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
            <Icon name="guaranteed" className="w-5 h-5 text-primary" />
            <span>Guaranteed</span>
          </li>
        )}
        {product.isFreeDelivery && (
          <li className="inline-flex items-center gap-1 font-medium text-gray-600 text-xs">
            <Icon name="delivery" className="w-5 h-5 text-primary" />
            <span>Free Delivery</span>
          </li>
        )}
      </ul>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 flex-wrap py-3 lg:py-0 mb-3 lg:mb-0 border-t border-b border-gray-200 lg:border-none">
        <span>Select Color:</span>
        <ul className="flex items-center gap-4 lg:gap-2 flex-wrap">
          {product.colors.map((color) => (
            <li key={color.name} className="inline-flex items-center gap-1">
              <input
                checked={selectedColor.name === color.name}
                id={`color-${color.name}`}
                className="sr-only peer"
                type="radio"
                name="color"
                onChange={() => setSelectedColor(color)}
              />
              <label
                className="cursor-pointer inline-flex gap-1 items-center relative peer-checked:[&>*:first-child>*]:opacity-100 py-1 px-1.5 lg:p-0 border rounded-lg border-gray-200 lg:border-none peer-checked:border-primary"
                htmlFor={`color-${color.name}`}
              >
                <div
                  className="relative w-5 h-5 border rounded-full"
                  style={{ backgroundColor: color.value.hex }}
                >
                  <Check
                    className={cn(
                      "w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0",
                      color.name === "White" && "text-black"
                    )}
                  />
                </div>
                <span className="lg:hidden font-light text-sm">
                  {color.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 font-medium">Brand:</span>
        <span className="font-medium">{product.brand.name}</span>
      </div>
    </div>
  );
};
