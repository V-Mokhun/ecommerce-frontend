import { graphql } from "..";

export const GET_SALE_PRODUCTS = graphql(`
  query GetSaleProducts {
    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {
      ...ProductFields
    }
  }
`);
