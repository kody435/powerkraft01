// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}

const Post = ({ post }: any) => {
  const {
    title,
    mainImage,
    description,
  } = post;
  return (
    <article>
      {mainImage && (
        <div>
          <Image src={urlFor(mainImage).url()} width={250} height={200} alt="alt" />
        </div>
      )}
      <h2>{title}</h2>
      <h2>{description}</h2>
    </article>
  );
};

const query = groq`*[_type == "product" && slug.current == $slug][0]{
  title,
  slug,
  mainImage,
  description,
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "product" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}
export default Post;