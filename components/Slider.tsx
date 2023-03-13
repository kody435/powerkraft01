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
          className="rounded p-4 w-full h-80"
          width={1300}
          height={200}
        />
      );
    })
  );

  return (
    <div className="flex flex-row justify-center items-center border-solid border-black border-2 h-[300px]">
      <Carousel autoplay wrapAround adaptiveHeight className="">
        {slides}
      </Carousel>
    </div>
  );
};
