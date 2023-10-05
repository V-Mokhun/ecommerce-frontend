import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "..";

const builder = imageUrlBuilder(sanityClient);

export const imageBuilder = (source: string) => builder.image(source);
