import { graphql } from "..";

export const PRODUCT_FIELDS = graphql(`
  fragment ProductFields on Product {
    _id
    name
    rating
    price
    oldPrice
    salePercentage
    isOnSale
    colors {
      name
      value {
        hex
      }
    }
    slug {
      current
    }
    mainImage {
      ...ImageFields
    }
    isFreeDelivery
    isInStock
    isGuaranteed
  }
`);
