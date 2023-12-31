import { graphql } from "..";

export const IMAGE_FIELDS_FRAGMENT = graphql(
  `
    fragment ImageFields on Image {
      asset {
        _id
        url
        path
        assetId
        extension
      }
      hotspot {
        width
        height
        x
        y
      }
      crop {
        top
        bottom
        right
        left
      }
    }
  `
);
