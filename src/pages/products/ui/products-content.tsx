import { ProductsFilters } from "./products-filters";

interface ProductsContentProps {}

export const ProductsContent = ({}: ProductsContentProps) => {
  return (
    <div>
      <ul className="mb-6 md:mb-8"></ul>
      <div className="flex gap-6 mb-8">
        <ProductsFilters />
        <div className="flex-1"></div>
      </div>
    </div>
  );
};
