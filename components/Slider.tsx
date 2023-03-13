import urlFor from "@/lib/urlFor";
import { TSlider } from "@/pages";
import Image from "next/image";
import Carousel from "nuka-carousel";

export const Slider = ({ sliders }: { sliders: TSlider[] }) => {
  const slides = sliders.map((slider) =>
    slider.sliderImages.map((img, idx) => {
      return (
        <Image
          key={idx}
          src={urlFor(img.asset._ref.toString()).url()}
          alt=""
          className="rounded p-4 w-full h-96"
          width={1300}
          height={200}
        />
      );
    })
  );

  return (
    <div className="flex flex-row justify-center items-center h-64 my-16">
      <Carousel autoplay wrapAround adaptiveHeight className="">
        {slides}
      </Carousel>
    </div>
  );
};
