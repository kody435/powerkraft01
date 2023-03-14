import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

// export const ProductList = ({ products }: { products: TProd[] }) => {
export type TSections = {
  evas: {
    slug: { current: string };
    mainImage: { asset: { _ref: string } };
    title: string;
  }[];
  alums: {
    slug: { current: string };
    mainImage: { asset: { _ref: string } };
    title: string;
  }[];
  others: {
    slug: { current: string };
    mainImage: { asset: { _ref: string } };
    title: string;
  }[];
};
export const ProductList = ({ evas, alums, others }: TSections) => {
  // const listProducts = products.map((product, index) => {
  //   return (
  //     <div key={index} className="bg-white m-4">
  //       {product && (
  //         <Link
  //           href={`/product/${product.slug?.current}`}
  //           className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110 "
  //         >
  //           <Image
  //             src={urlFor(product.mainImage.asset._ref.toString()).url()}
  //             alt=""
  //             className="w-full rounded p-4"
  //             width={1000}
  //             height={300}
  //           />

  //           <div className="my-3 ml-4">
  //             <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
  //               {product.title}
  //             </h3>
  //           </div>
  //         </Link>
  //       )}
  //     </div>
  //   );
  // });

  const listEva = evas.map((eva, index) => {
    return (
      <div key={index} className="bg-white m-0">
        {eva && (
          <Link
            href={`/product/${eva.slug?.current}`}
            className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110 "
          >
            <Image
              src={urlFor(eva.mainImage.asset._ref.toString()).url()}
              alt=""
              className="w-full rounded p-4"
              width={1000}
              height={300}
            />

            <div className="my-3 ml-4">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 pb-4">
                {eva.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    );
  });
  const listAlum = alums.map((alum, index) => {
    return (
      <div key={index} className="bg-white m-0">
        {alum && (
          <Link
            href={`/product/${alum.slug?.current}`}
            className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110 "
          >
            <Image
              src={urlFor(alum.mainImage.asset._ref.toString()).url()}
              alt=""
              className="w-full rounded p-4"
              width={1000}
              height={300}
            />

            <div className="my-3 ml-4">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 pb-4">
                {alum.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    );
  });
  const listOther = others.map((other, index) => {
    return (
      <div key={index} className="bg-white m-0">
        {other && (
          <Link
            href={`/product/${other.slug?.current}`}
            className="shadow-lg block group ease-in-out delay-150 duration-300 hover:-translate-1 translate hover:scale-110 "
          >
            <Image
              src={urlFor(other.mainImage.asset._ref.toString()).url()}
              alt=""
              className="w-full rounded p-4"
              width={1000}
              height={300}
            />

            <div className="my-3 ml-4">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 pb-4">
                {other.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    );
  });

  return (
    <div className="">
      <div className="border-b-2 text-center border-b-gray-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-8 gap-4 xl:grid-cols-6 lg:gap-6 lg:mx-3 lg:my-4 md:m-16 items-center p-4">
        <h1 className="text-center text-lg text-black border-l-4 border-gray-200 hover:border-[#8d3151]  py-1 mx-0">
          Eva Cases
        </h1>
        {listEva}
      </div>
      <div className="border-b-2 text-center border-b-gray-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-8 gap-4 xl:grid-cols-6 lg:gap-6 lg:mx-3 lg:my-4 md:m-16 items-center p-4">
        <h1 className="text-center text-lg text-black border-l-4 border-gray-200 hover:border-[#8d3151]  py-1 mx-0">
          Aluminum Cases
        </h1>
        {listAlum}
      </div>
      <div className=" text-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-8 gap-4 xl:grid-cols-6 lg:gap-6 lg:mx-3 lg:my-4 md:m-16 items-center p-4">
        <h1 className="text-center text-lg text-black border-l-4 border-gray-200 hover:border-[#8d3151]  py-1 mx-0">
          Other Cases
        </h1>
        {listOther}
      </div>
    </div>
  );
};
