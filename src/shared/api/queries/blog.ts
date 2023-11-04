import { graphql } from "..";

export const GET_BLOG_CATEGORIES = graphql(`
  query GetBlogCategories {
    allBlogCategory {
      _id
      name
      slug {
        current
      }
    }
  }
`);

export const GET_BLOG_TAGS = graphql(`
  query GetBlogTags {
    allBlogTag {
      _id
      name
      slug {
        current
      }
    }
  }
`);

export const GET_RECENT_BLOG_POSTS = graphql(`
  query GetRecentBlogPosts {
    allBlogPost(sort: { _createdAt: DESC }, limit: 3) {
      ...BlogPostFields
    }
  }
`);
