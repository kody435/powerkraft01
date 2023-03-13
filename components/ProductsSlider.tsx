import Carousel from "nuka-carousel/lib/carousel";
import { TProduct } from "@/pages/product/[slug]";
import urlFor from "@/lib/urlFor";
import Image from "next/image";

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
    <Carousel autoplay={true} wrapAround={true} adaptiveHeight={true} withoutControls zoomScale={20} className="">
      {slides}
    </Carousel>
  );
};
