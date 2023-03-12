import { RichTextComponent } from "@/components/RichTextComponents";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import groq from "groq";
import Link from "next/link";
import client from "../../client";


type TProduct = {
  product: {
    slug: { current: string };
    title: string;
    mainImage: { asset: { _ref: string } };
    description: [];
    amazonLink: string;
  };
};



const Product = ({ product }: TProduct) => {
  // console.log("Product: ", product);

  return (
    <>
      {product && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-96 object-fill w-full h-full rounded p-4"
                src={urlFor(product.mainImage.asset._ref.toString()).url()}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h2>
                <div className="flex mb-4 mt-10"></div>
                <div className="leading-relaxed">
                  <PortableText
                    value={product.description}
                    components={RichTextComponent}
                  ></PortableText>
                </div>

                <div className="flex md:mt-10">
                  <Link
                    key={product.amazonLink}
                    className="flex ml-auto border-2 py-2 px-6 border-black text-black text-xl translate-1 transition hover:scale-110 duration:1000 delay-100 ease-in-out"
                    href={product.amazonLink}
                  >
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
  amazonLink,
  similarProduct
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
  const { slug = "" } = context.params;
  const product = await client.fetch(query, { slug });
  return {
    props: {
      product,
    },
  };
}
export default Product;
