import urlFor from "@/lib/urlFor";
import { TProduct } from "@/pages/product/[slug]";
import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";

type TProductSliderProps = { product: TProduct };
export const ProductSlider = ({ product }: TProductSliderProps) => {
  const slides = product.images.map((img, idx) => (
    <Image
      key={idx}
      src={urlFor(img.asset._ref.toString()).url()}
      alt=""
      className="rounded px-1 w-full h-[52]"
      width={1300}
      height={100}
    />
  ));
  return (
    <div className="flex flex-row h-[52] md:h-full w-full ">
      <Carousel autoplay={true} wrapAround={true} adaptiveHeight={true} withoutControls zoomScale={20} className="">
        {slides}
      </Carousel>
    </div>
  );
};
