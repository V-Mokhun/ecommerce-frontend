import { graphql } from "..";

export const GET_FAQ_TOPICS = graphql(`
  query GetFaqTopics {
    allFaqTopic(sort: { _updatedAt: ASC }) {
      _id
      name
      items {
        title
        content
      }
    }
  }
`);
