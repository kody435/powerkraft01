import React from "react";
import urlFor from "@/lib/urlFor";
import Link from "next/link";
import client from "@/client";
import groq from "groq";

const Slider = ({ slider }: any) => {
  return (
    <>
      {slider && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div
            className="container px-5 py-24 
          mx-auto"
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/*
              <img
                alt="ecommerce"
                className="lg:w-96 object-fill w-full h-full rounded p-4"
                src={urlFor(sliders.sliderImages).url()}
              />
              */}
              <h2>{slider.title}</h2>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "slider"]
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Slider;
