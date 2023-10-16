import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { ProductSorting } from "../generated/graphql";

export type Product = {
  _id: string;
  name: string;
  price: number;
  rating: number;
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

export enum SortFields {
  PRICE_ASC = "price.asc",
  PRICE_DESC = "price.desc",
  RATING_DESC = "rating.desc",
  IS_NEW_DESC = "isNew.desc",
}
