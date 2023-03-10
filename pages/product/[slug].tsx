// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import PortableText from "react-portable-text";
import Link from "next/link";

const Post = ({post}: {
  post: { title: string; description: string; mainImage: string, amazonLink : string };
}) => {
  return (
    <>
      {post && (
        <article>
          {post.mainImage && (
            <div>
              <Image
                src={urlFor(post.mainImage).url()}
                width={250}
                height={200}
                alt={post.mainImage.alt}
              />
            </div>
          )}
          <h2>{post.title}</h2>
          <Link className="text-black" href={post.amazonLink}>
            Amazon
          </Link>
        </article>
      )}
    </>
  );
};

const query = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  title,
  slug,
  mainImage,
  description,
  amazonLink
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
