/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment ImageFields on Image {\n      asset {\n        _id\n        url\n        path\n        assetId\n        extension\n      }\n      hotspot {\n        width\n        height\n        x\n        y\n      }\n      crop {\n        top\n        bottom\n        right\n        left\n      }\n    }\n  ": types.ImageFieldsFragmentDoc,
    "\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    salePrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n": types.ProductFieldsFragmentDoc,
    "\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  ": types.GetCategoriesDocument,
    "\n  query GetSaleProducts {\n    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {\n      ...ProductFields\n    }\n  }\n": types.GetSaleProductsDocument,
    "\n  query GetNewProducts {\n    allProduct(\n      where: { isNew: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n": types.GetNewProductsDocument,
    "\n  query GetBestSellerProducts {\n    allProduct(\n      where: { isBestSeller: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n": types.GetBestSellerProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ImageFields on Image {\n      asset {\n        _id\n        url\n        path\n        assetId\n        extension\n      }\n      hotspot {\n        width\n        height\n        x\n        y\n      }\n      crop {\n        top\n        bottom\n        right\n        left\n      }\n    }\n  "): (typeof documents)["\n    fragment ImageFields on Image {\n      asset {\n        _id\n        url\n        path\n        assetId\n        extension\n      }\n      hotspot {\n        width\n        height\n        x\n        y\n      }\n      crop {\n        top\n        bottom\n        right\n        left\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    salePrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n"): (typeof documents)["\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    salePrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSaleProducts {\n    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  query GetSaleProducts {\n    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {\n      ...ProductFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNewProducts {\n    allProduct(\n      where: { isNew: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  query GetNewProducts {\n    allProduct(\n      where: { isNew: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBestSellerProducts {\n    allProduct(\n      where: { isBestSeller: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  query GetBestSellerProducts {\n    allProduct(\n      where: { isBestSeller: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;