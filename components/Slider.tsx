import React from "react";
import urlFor from "@/lib/urlFor";
import Link from "next/link";
import client from "@/client";
import groq from "groq";

/*
function Slider({posts} :any) {
  return (
      <div>
          {posts.map(({ images = "" }: any) => (
          
            <img
              src={urlFor(images).url()}
              alt=""
              className="object-fill w-full rounded p-4"
            />

        ))}
    </div>
  )
}
*/

const Slider = ({ post }: any) => {
  return (
    <>
      {post && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div
            className="container px-5 py-24 
          mx-auto"
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-96 object-fill w-full h-full rounded p-4"
                src={urlFor(post.sliderImages).url()}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "slider"]{
        sliderImages
      }
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Slider;
