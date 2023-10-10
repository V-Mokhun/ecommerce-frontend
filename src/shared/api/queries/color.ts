import { graphql } from "..";

export const GET_COLORS = graphql(`
  query GetColors {
    allColorItem {
      _id
      name
      value {
        hex
      }
    }
  }
`);
