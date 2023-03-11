/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import urlFor from "../lib/urlFor";
import Slider from "../components/Slider";

const Index = ({ posts }: any) => {
  return (
    <>
      <Head>
        <title>POWERKRAFT</title>
        <meta
          name="description"
          content="POWERKRAFT is a leading manufacturer of Table Tennis equiments."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider post={posts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-16 object-fill ">
        {posts.map(({ title = "", slug = "", mainImage = "" }: any) => (
          <Link
            href={`/product/${encodeURIComponent(slug.current)}`}
            className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110"
          >
            <img
              src={urlFor(mainImage).url()}
              alt=""
              className="object-fill w-full rounded p-4"
            />

            <div className="my-3 ml-4">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                {title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "product"]{
        title,
        mainImage,
        slug
      }
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Index;
