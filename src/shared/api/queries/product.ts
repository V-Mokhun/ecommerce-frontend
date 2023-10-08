import { graphql } from "..";

export const GET_SALE_PRODUCTS = graphql(`
  query GetSaleProducts {
    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {
      ...ProductFields
    }
  }
`);

export const GET_NEW_PRODUCTS = graphql(`
  query GetNewProducts {
    allProduct(where: { isNew: { eq: true } }, limit: 4) {
      ...ProductFields
    }
  }
`);
