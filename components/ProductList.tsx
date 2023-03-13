import urlFor from "@/lib/urlFor";
import { TProd } from "@/pages";
import Link from "next/link";

export const ProductList = ({ products }: { products: TProd[] }) => {
  const listProducts = products.map((product, index) => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6 lg:mx-3 lg:my-4 md:m-16">
      {listProducts}
    </div>
  );
};
