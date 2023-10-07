interface ProductCardProps {
  colors?: string[];
  name: string;
  price: string;
  salePrice?: string;
  salePercentage?: string;
  rating?: number;
}

export const ProductCard = ({}: ProductCardProps) => {
  return <div></div>;
};
