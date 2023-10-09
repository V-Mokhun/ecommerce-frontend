import { graphql } from "..";

export const GET_BRANDS = graphql(`
  query GetBrands {
    allBrand {
      _id
      name
      slug {
        current
      }
      logo {
        ...ImageFields
      }
    }
  }
`);
