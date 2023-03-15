import { RichTextComponent } from "@/components/RichTextComponents";
import { TSlider } from "@/pages";
import { PortableText } from "@portabletext/react";
import groq from "groq";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import client from "../../utils/client";
import urlFor from "../../lib/urlFor";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";


export type TProduct = {
  title: string;
  description: [];
  mainImage: string;
  amazonLink: string;
  similarProduct: [];
  images: { asset: { _ref: string } }[];
};

type TProductProps = { product: TProduct; sliders: TSlider[] };
const Product = ({ product }: TProductProps) => {
  console.log()
  const imgs =
    product &&
    product?.images.map((img) => ({
      original: urlFor(img.asset._ref.toString()).url(),
      thumbnail: urlFor(img.asset._ref.toString()).url(),
    }));

  return (
    <>
      {product && (
        <section className="text-gray-600 body-font overflow-hidden ">
          <div className="container px-1 py-1 mx-auto">
            <ImageGallery
              items={imgs}
              autoPlay
              infinite
              disableKeyDown
              showNav={false}
              showPlayButton={false}
              disableSwipe={false}
              disableThumbnailScroll={false}
            />
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h2>
                
                <div className="leading-relaxed">
                  <PortableText value={product.description} components={RichTextComponent}></PortableText>
                </div>

                <div className="flex md:mt-10">
                  <Link
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
  similarProduct,
  categories
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(groq`*[_type == "product" && defined(slug.current)][].slug.current`);

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const { slug = "" } = context.params;
  const product = await client.fetch(query, { slug });
  const sliders = await client.fetch(groq`*[_type == "slider"]`);
  return {
    props: {
      product,
      sliders,
    },
  };
}
export default Product;
