import urlFor from "@/lib/urlFor";
import { TSlider } from "@/pages";
import Image from "next/image";
import Carousel from "nuka-carousel";

type TSliderProps = { sliders: TSlider[] };
export const Slider = ({ sliders }: TSliderProps) => {
  const slides = sliders.map((slider) =>
    slider.sliderImages.map((img, idx) => {
      return (
        <Image
          key={idx}
          src={urlFor(img.asset._ref.toString()).url()}
          alt=""
          className="rounded px-1 w-full h-[52]"
          width={1300}
          height={100}
        />
      );
    })
  );

  return (
    <Carousel autoplay={true} wrapAround={true} adaptiveHeight={true} withoutControls className="">
      {slides}
    </Carousel>
  );
};
