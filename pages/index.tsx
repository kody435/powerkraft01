import groq from "groq";
import Head from "next/head";
import Link from "next/link";
import client from "../client";
import urlFor from "@/lib/urlFor";
import Carousel from "nuka-carousel/lib/carousel";
import image from '../img-123.png'

// ! big bundle imports all library
// import * as react from "react"
// ! imports only needs, reduces bundle size (bundle size = downloaded bytes at network)
// import {useState } from "react"

// ! Unused for now
// import Slider from "@/components/Slider";

// ? Test line 

/**
 * ! React performance tips
 * * - Get rid of unused things OK
 * * - extract your complex logic outside of render block OK
 * * - Extract your unrelated things onto different components OK
 * * - Now let me refactor here a bit ✅ OK
 * * - Keep your bundle size as small as possible ✅ (when you make things above, this will happens auto)
 * */

// ** AM ok now ! you can look for "react performance optimization tips for further "
/**
 * ! Use this settings to be faster ! ✅
 * "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true,
    "source.addMissingImports": true
  },
 */

type TProd = {
  slug: { current: string };
  title: string;
  mainImage: { asset: { _ref: string } };
  description: [];
  amazonLink: string;
};

type TSlider = {
  sliderImages: { asset: { _ref: string } }[];
};

type TProducts = {
  products: TProd[];
  sliders: TSlider[];
};

const Index = ({ products, sliders }: TProducts) => {
  console.log("Sliders: ", sliders);
  // ! complex logic
  // ! this will be nother component
  const testSlider = sliders.map((slider, index) => {
    return (
      <Carousel>
        <img
          key={index}
          src="https://cdn.sanity.io/images/wub429kh/production/18d524ec0bd71a0e344b1fa5fd5f90fdf84aa38b-1600x1201.jpg"
          alt=""
          className="rounded p-4 w-full h-80"
        />
        <img
          key={index}
          src="https://cdn.sanity.io/images/wub429kh/production/18d524ec0bd71a0e344b1fa5fd5f90fdf84aa38b-1600x1201.jpg"
          alt=""
          className="rounded p-4 w-full h-80"
        />
        <img
          key={index}
          src="https://cdn.sanity.io/images/wub429kh/production/18d524ec0bd71a0e344b1fa5fd5f90fdf84aa38b-1600x1201.jpg"
          alt=""
          className="rounded p-4 w-full h-80"
        />
      </Carousel>
    );
  });

  const productList =
    products &&
    products.map((product, index) => {
      return (
        <div key={index} className="">
          {product && (
            <Link
              href={`/product/${product.slug?.current}`}
              className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110 "
            >
              <img src={urlFor(product.mainImage.asset._ref.toString()).url()} alt="" className="w-full rounded p-4" />

              <div className="my-3 ml-4">
                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {product.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      );
    });

  // ! render block
  return (
    <>
      <Head>
        <title>POWERKRAFT</title>
        <meta name="description" content="POWERKRAFT is a leading manufacturer of Table Tennis equiments." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className=" bg-blue-400">{testSlider}</div>
        {/* // ! Now used  */}
        {/* <Slider/> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-8 my-4 md:m-16">
          {productList}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const products = await client.fetch(groq`*[_type == "product"]`);
  // ! Here is belongs to totally slider component when you write it
  const sliders = await client.fetch(groq`*[_type == "slider"]`);
  return {
    props: {
      products,
      sliders,
    },
  };
}

// ! Here is belongs to totally slider component when you write it
// use here inside your Slider component
//   const sliders = await client.fetch(groq`*[_type == "slider"]`);

export default Index;
