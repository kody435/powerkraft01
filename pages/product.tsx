import { ProductList } from "@/components/ProductList";
import groq from "groq";
import client from "../utils/client";

export type TProd = {
  slug: { current: string };
  title: string;
  mainImage: { asset: { _ref: string } };
  description: [];
  amazonLink: string;
};

type TProducts = {
  products: TProd[];
};

const Index = ({ products }: TProducts) => {
  return (
    <div className="w-full m-0 p-0">
      <ProductList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const products = await client.fetch(groq`*[_type == "product"]`);
  return {
    props: {
      products,
    },
  };
}

export default Index;
