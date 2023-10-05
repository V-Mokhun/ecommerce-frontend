import imageUrlBuilder from "@sanity/image-url";
import {
  SanityAsset,
  SanityImageObject,
  SanityImageWithAssetStub,
  SanityReference,
} from "@sanity/image-url/lib/types/types";
import { sanityClient } from "..";

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource =
  | string
  | SanityReference
  | SanityAsset
  | SanityImageObject
  | SanityImageWithAssetStub;

export const imageBuilder = (source: SanityImageSource) =>
  builder.image(source);
