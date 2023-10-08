import { graphql } from "..";

export const GET_HOME_BANNERS = graphql(`
  query GetHomeBanners {
    largeBanner: allBanner(
      where: { showOn: { eq: "home" }, size: { eq: "lg" } }
      limit: 1
    ) {
			title
      desktopImage {
        ...ImageFields
      }
      mobileImage {
        ...ImageFields
      }
      link
      size
    }

    mediumBanner: allBanner(
      where: { showOn: { eq: "home" }, size: { eq: "md" } }
      limit: 1
    ) {
			title
      desktopImage {
        ...ImageFields
      }
      mobileImage {
        ...ImageFields
      }
      link
      size
    }

    smallBanner: allBanner(
      where: { showOn: { eq: "home" }, size: { eq: "sm" } }
      limit: 1
    ) {
			title
      desktopImage {
        ...ImageFields
      }
      mobileImage {
        ...ImageFields
      }
      link
      size
    }
  }
`);
