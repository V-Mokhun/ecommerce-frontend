import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export type Color = { name: string; value: { hex: string } };

export type Product = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  quantity: number;
  oldPrice?: number;
  salePercentage?: number;
  isOnSale: boolean;
  colors: Color[];
  slug: { current: string };
  mainImage: SanityImageObject;
  isFreeDelivery: boolean;
  isInStock: boolean;
  isGuaranteed: boolean;
};

export type CartProduct = Omit<Product, "colors"> & {
  color: Color;
};

export enum SortFields {
  PRICE_ASC = "price.asc",
  PRICE_DESC = "price.desc",
  RATING_DESC = "rating.desc",
  IS_NEW_DESC = "isNew.desc",
}

export interface ProductFilters {
  brands: string[];
  onSale: boolean;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
}

export interface ProductDetail {
  name: string;
  value: string;
}

export type SingleProduct = Product & {
  brand: {
    _id: string;
    name: string;
  };
  images: SanityImageObject[];
  details: ProductDetail[];
  category: {
    name: string;
    slug: {
      current: string;
    };
  };
  similarProducts: Product[] | null;
};

export type Shipping = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  readTime: number;
  _createdAt: string;
  image: SanityImageObject;
};

export type SingleBlogPost = BlogPost & {
  bodyRaw: JSON;
  author: {
    name: string;
  };
  category: {
    name: string;
    slug: {
      current: string;
    };
  };
  tags: {
    name: string;
    slug: {
      current: string;
    };
  }[];
};
