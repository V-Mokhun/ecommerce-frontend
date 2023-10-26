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
    "\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    quantity\n    oldPrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n": types.ProductFieldsFragmentDoc,
    "\n  query GetHomeBanners {\n    largeBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"lg\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    mediumBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"md\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    smallBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"sm\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n  }\n": types.GetHomeBannersDocument,
    "\n  query GetBrands {\n    allBrand {\n      _id\n      name\n      slug {\n        current\n      }\n      logo {\n        ...ImageFields\n      }\n    }\n  }\n": types.GetBrandsDocument,
    "\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  ": types.GetCategoriesDocument,
    "\n  query GetColors {\n    allColorItem {\n      _id\n      name\n      value {\n        hex\n      }\n    }\n  }\n": types.GetColorsDocument,
    "\n  query GetContacts {\n    allContact(limit: 1) {\n      address\n      phone\n      phoneShort\n      _id\n      email\n    }\n  }\n": types.GetContactsDocument,
    "\n  query GetFaqTopics {\n    allFaqTopic(sort: { _updatedAt: ASC }) {\n      _id\n      name\n      items {\n        title\n        content\n      }\n    }\n  }\n": types.GetFaqTopicsDocument,
    "\n  query GetProducts(\n    $filters: ProductFilter\n    $sort: [ProductSorting!]\n    $limit: Int = 15\n    $offset: Int = 0\n  ) {\n    products: allProduct(\n      where: $filters\n      sort: $sort\n      limit: $limit\n      offset: $offset\n    ) {\n      ...ProductFields\n    }\n    productsCount: allProduct(where: $filters) {\n      _id\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetSaleProducts {\n    allProduct(where: { isOnSale: { eq: true } }, limit: 10) {\n      ...ProductFields\n    }\n  }\n": types.GetSaleProductsDocument,
    "\n  query GetNewProducts {\n    allProduct(\n      where: { isNew: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n": types.GetNewProductsDocument,
    "\n  query GetBestSellerProducts {\n    allProduct(\n      where: { isBestSeller: { eq: true } }\n      limit: 4\n      sort: { rating: DESC }\n    ) {\n      ...ProductFields\n    }\n  }\n": types.GetBestSellerProductsDocument,
    "\n  query GetSingleProduct($slug: String!) {\n    allProduct(where: { slug: { current: { eq: $slug } } }, limit: 1) {\n      ...ProductFields\n      brand {\n        name\n      }\n      images {\n        ...ImageFields\n      }\n      details {\n        name\n        value\n      }\n      category {\n        name\n        slug {\n          current\n        }\n      }\n      similarProducts {\n        ...ProductFields\n      }\n    }\n  }\n": types.GetSingleProductDocument,
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
export function graphql(source: "\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    quantity\n    oldPrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n"): (typeof documents)["\n  fragment ProductFields on Product {\n    _id\n    name\n    rating\n    price\n    quantity\n    oldPrice\n    salePercentage\n    isOnSale\n    colors {\n      name\n      value {\n        hex\n      }\n    }\n    slug {\n      current\n    }\n    mainImage {\n      ...ImageFields\n    }\n    isFreeDelivery\n    isInStock\n    isGuaranteed\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHomeBanners {\n    largeBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"lg\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    mediumBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"md\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    smallBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"sm\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n  }\n"): (typeof documents)["\n  query GetHomeBanners {\n    largeBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"lg\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    mediumBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"md\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n\n    smallBanner: allBanner(\n      where: { showOn: { eq: \"home\" }, size: { eq: \"sm\" } }\n      limit: 1\n    ) {\n\t\t\ttitle\n      desktopImage {\n        ...ImageFields\n      }\n      mobileImage {\n        ...ImageFields\n      }\n      link\n      size\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBrands {\n    allBrand {\n      _id\n      name\n      slug {\n        current\n      }\n      logo {\n        ...ImageFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBrands {\n    allBrand {\n      _id\n      name\n      slug {\n        current\n      }\n      logo {\n        ...ImageFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetCategories {\n      allCategory {\n        _id\n        name\n        shortName\n        slug {\n          current\n        }\n        icon {\n          ...ImageFields\n        }\n        image {\n          ...ImageFields\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetColors {\n    allColorItem {\n      _id\n      name\n      value {\n        hex\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetColors {\n    allColorItem {\n      _id\n      name\n      value {\n        hex\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContacts {\n    allContact(limit: 1) {\n      address\n      phone\n      phoneShort\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetContacts {\n    allContact(limit: 1) {\n      address\n      phone\n      phoneShort\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFaqTopics {\n    allFaqTopic(sort: { _updatedAt: ASC }) {\n      _id\n      name\n      items {\n        title\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFaqTopics {\n    allFaqTopic(sort: { _updatedAt: ASC }) {\n      _id\n      name\n      items {\n        title\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts(\n    $filters: ProductFilter\n    $sort: [ProductSorting!]\n    $limit: Int = 15\n    $offset: Int = 0\n  ) {\n    products: allProduct(\n      where: $filters\n      sort: $sort\n      limit: $limit\n      offset: $offset\n    ) {\n      ...ProductFields\n    }\n    productsCount: allProduct(where: $filters) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  query GetProducts(\n    $filters: ProductFilter\n    $sort: [ProductSorting!]\n    $limit: Int = 15\n    $offset: Int = 0\n  ) {\n    products: allProduct(\n      where: $filters\n      sort: $sort\n      limit: $limit\n      offset: $offset\n    ) {\n      ...ProductFields\n    }\n    productsCount: allProduct(where: $filters) {\n      _id\n    }\n  }\n"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSingleProduct($slug: String!) {\n    allProduct(where: { slug: { current: { eq: $slug } } }, limit: 1) {\n      ...ProductFields\n      brand {\n        name\n      }\n      images {\n        ...ImageFields\n      }\n      details {\n        name\n        value\n      }\n      category {\n        name\n        slug {\n          current\n        }\n      }\n      similarProducts {\n        ...ProductFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSingleProduct($slug: String!) {\n    allProduct(where: { slug: { current: { eq: $slug } } }, limit: 1) {\n      ...ProductFields\n      brand {\n        name\n      }\n      images {\n        ...ImageFields\n      }\n      details {\n        name\n        value\n      }\n      category {\n        name\n        slug {\n          current\n        }\n      }\n      similarProducts {\n        ...ProductFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;