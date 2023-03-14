import { createClient } from "next-sanity";

export default createClient({
  projectId: "wub429kh",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-11-15",
});
