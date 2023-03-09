/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import Carousel from "../components/Carousel";
import Head from "next/head";

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }: any) => {
  return (
    <div>
      <Head>
        <title>POWERKRAFT</title>
        <meta
          name="description"
          content="POWERKRAFT is a leading manufacturer of Table Tennis equiments."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-16 object-fill">
        {posts.map(({ title = "", slug = "", mainImage = "" }: any) => (
          <Link
            href={`/product/${encodeURIComponent(slug.current)}`}
            className="shadow-lg "
          >
            <div className="text-center flex flex-col items-center justify-center">
              <Image
                src={urlFor(mainImage).url()}
                width={250}
                height={200}
                alt="alt"
              />
              <h2 className="text-black font-bolder text-md p-3 text-xl font-light">
                {title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "product"]
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Index;
