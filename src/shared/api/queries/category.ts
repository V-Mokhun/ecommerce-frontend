import { graphql } from "..";

export const GET_CATEGORIES = graphql(
  `
    query GetCategories {
      allCategory {
        _id
        name
        shortName
        slug {
          current
        }
        icon {
          ...ImageFields
        }
        image {
          ...ImageFields
        }
      }
    }
  `
);
