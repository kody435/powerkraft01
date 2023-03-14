import imageUrlBuilder from "@sanity/image-url";
import client from "../utils/client";

export default function urlFor(source: string) {
  return imageUrlBuilder(client).image(source);
}
