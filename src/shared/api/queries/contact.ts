import { graphql } from "..";

export const GET_CONTACTS = graphql(`
  query GetContacts {
    allContact(limit: 1) {
      address
      phone
      phoneShort
      _id
      email
    }
  }
`);
