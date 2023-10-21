import { graphql } from "..";

export const GET_PRODUCTS = graphql(`
  query GetProducts(
    $filters: ProductFilter
    $sort: [ProductSorting!]
    $limit: Int = 15
    $offset: Int = 0
  ) {
    products: allProduct(
      where: $filters
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      ...ProductFields
    }
    productsCount: allProduct(where: $filters) {
      _id
    }
  }
`);

export const GET_SALE_PRODUCTS = graphql(`
  query GetSaleProducts {
    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {
      ...ProductFields
    }
  }
`);

export const GET_NEW_PRODUCTS = graphql(`
  query GetNewProducts {
    allProduct(
      where: { isNew: { eq: true } }
      limit: 4
      sort: { rating: DESC }
    ) {
      ...ProductFields
    }
  }
`);

export const GET_BEST_SELLER_PRODUCTS = graphql(`
  query GetBestSellerProducts {
    allProduct(
      where: { isBestSeller: { eq: true } }
      limit: 4
      sort: { rating: DESC }
    ) {
      ...ProductFields
    }
  }
`);

export const GET_SINGLE_PRODUCT = graphql(`
  query GetSingleProduct($slug: String!) {
    allProduct(where: { slug: { current: { eq: $slug } } }, limit: 1) {
      ...ProductFields
      brand {
        name
      }
      images {
        ...ImageFields
      }
      details {
        name
        value
      }
      category {
        name
        slug {
          current
        }
      }
    }
  }
`);
