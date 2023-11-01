import { graphql } from "..";

export const GET_SHIPPINGS = graphql(`
	query GetShippings {
		allShipping(sort: { price: ASC }) {
			_id
			name
			price
			description
		}
	}
`)
