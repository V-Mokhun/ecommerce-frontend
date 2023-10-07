import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  isOnSale: boolean;
  colors: { name: string; value: { hex: string } }[] | null;
  slug: { current: string };
  mainImage: SanityImageObject;
  isFreeDelivery: boolean;
  isInStock: boolean;
  isGuaranteed: boolean;
};