import { ProductList } from "@/components/ProductList";
import { Slider } from "@/components/Slider";
import groq from "groq";
import Head from "next/head";
import client from "../utils/client";

export type TProd = {
  slug: { current: string };
  title: string;
  mainImage: { asset: { _ref: string } };
  description: [];
  amazonLink: string;
};
export type TSlider = {
  sliderImages: { asset: { _ref: string } }[];
};

type TProducts = {
  products: TProd[];
  sliders: TSlider[];
};

const Index = ({ products, sliders }: TProducts) => {
  return (
    <div className="w-full m-0 p-0">
      <Head>
        <title>POWERKRAFT</title>
        <meta name="description" content="POWERKRAFT is a leading manufacturer of Table Tennis equiments." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Slider sliders={sliders} /> */}
      <ProductList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const products = await client.fetch(groq`*[_type == "product"]`);
  const sliders = await client.fetch(groq`*[_type == "slider"]`);
  return {
    props: {
      products,
      sliders,
    },
  };
}

export default Index;
