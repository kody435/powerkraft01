import groq from "groq";
import Head from "next/head";
import Link from "next/link";
import client from "../client";
import urlFor from "@/lib/urlFor";
import Slider from "@/components/Slider";

type TProducts = {
  products: {
    slug: { current: string };
    title: string;
    mainImage: string;
    // mainImage: { asset: { _ref: string } };
    description: [];
    amazonLink: string;
  }[];
  sliders: {
    titleSlider: [];
    sliderImages: [];
  };
};

const Index = ({ products, sliders }: TProducts) => {
  console.log("Sliders: ", sliders);
  console.log("Sliders: ", sliders.titleSlider);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-8 my-4 md:m-16">
        {products &&
          products.map((product, index) => {
            return (
              <div key={index}>
                {sliders && (
                  <div className="text-black">{ sliders.titleSlider }</div>
                )}
                {product && (
                  <Link
                    href={`/product/${product.slug?.current}`}
                    className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110"
                  >
                    <img
                      src={urlFor(product.mainImage).url()}
                      alt=""
                      className="w-full rounded p-4"
                    />

                    <div className="my-3 ml-4">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        {product.title}
                      </h3>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const products = await client.fetch(groq`*[_type == "product"]`);
  const sliders = await client.fetch(groq`*[_type == "slider"]`);
  return {
    props: {
      products,
      sliders
    },
  };
}

export default Index;
