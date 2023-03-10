// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import PortableText from "react-portable-text";
import Link from "next/link";

const Post = ({
  post,
}: {
  post: {
    title: string;
    description: string;
    mainImage: string;
    amazonLink: string;
  };
}) => {
  return (
    <>
      {post && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={urlFor(post.mainImage).url()}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {post.title}
                </h2>
                <div className="flex mb-4"></div>
                <p className="leading-relaxed">

                  {/* Description */}

                </p>

                <div className="flex">
                  <Link className="flex ml-auto border-2 py-2 px-6 border-black  text-black text-xl translate-1 transition hover:scale-110 duration:1000 delay-100 ease-in-out" href={post.amazonLink}>
                    Amazon ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
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
