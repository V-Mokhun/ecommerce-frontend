import { graphql } from "..";

export const GET_FAQ_TOPICS = graphql(`
  query GetFaqTopics {
    allFaqTopic {
      _id
      name
      items {
        title
        content
      }
    }
  }
`);
