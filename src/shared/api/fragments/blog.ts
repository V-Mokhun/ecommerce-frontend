import { graphql } from "..";

export const BLOG_POST_FIELDS_FRAGMENT = graphql(`
  fragment BlogPostFields on BlogPost {
    _id
    title
    slug {
      current
    }
    readTime
    image {
      ...ImageFields
    }
  }
`);
