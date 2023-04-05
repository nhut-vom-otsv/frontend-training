import { useEffect, useState } from "react";
import { carouselImages } from "../constants/data";
import OpacityMotionDiv from "./Animation/OpacityMotionDiv";

const Carousel = (): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const CHANGE_SLIDE_TIME = 5000; // time in milliseconds to change the slide

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (currentSlide) => (currentSlide + 1) % carouselImages.length
      );
    }, CHANGE_SLIDE_TIME);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative m-3 h-72 ">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.category}
            className="object-fit h-full w-full rounded-xl object-top md:object-fill"
          />
        </div>
      ))}

      <div className="absolute -bottom-4 w-full">
        <div className="flex h-4 items-center justify-center gap-2">
          {carouselImages.map((_, index) => (
            <div
              className={`h-2 w-2 rounded-full bg-black
              transition-all ${
                index === currentSlide ? "p-[0.375rem]" : "bg-opacity-50"
              }`}
              onClick={() => setCurrentSlide(index)}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
