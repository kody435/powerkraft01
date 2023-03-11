import imageUrlBuilder from "@sanity/image-url";
import client from "../client";

export default function urlFor(source: string) {
  return imageUrlBuilder(client).image(source);
}
