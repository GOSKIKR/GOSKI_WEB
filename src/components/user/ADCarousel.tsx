import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

const dummyImages = [
  "https://via.placeholder.com/800x300?text=Slide+1",
  "https://via.placeholder.com/800x300?text=Slide+2",
  "https://via.placeholder.com/800x300?text=Slide+3",
  "https://via.placeholder.com/800x300?text=Slide+4",
];

const ADCarousel = () => {
  const [currCarousel, setCurrCarousel] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    "transform duration-1000 ease-in-out"
  );

  useEffect(() => {
    // useEffect
    return () => {
      // Cleanup code
    };
  }, []);

  const makeNewImageArray = () => {
    const dataStart = dummyImages[0];
    const dataEnd = dummyImages[dummyImages.length - 1];
    const modifiedImages = [dataEnd, ...dummyImages, dataStart];
    return modifiedImages;
  };

  const slideNextBtn = () => {
    const slideLength = dummyImages.length;
    const newCurr = currCarousel + 1;
    setCurrCarousel(newCurr);

    if (newCurr === slideLength + 1) {
      initializeCarousel(1);
    }

    setCarouselTransition("transform duration-1000 ease-in-out");
  };

  const slidePrevBtn = () => {
    const slideLength = dummyImages.length;
    const newCurr = currCarousel - 1;
    setCurrCarousel(newCurr);

    if (newCurr === 0) {
      initializeCarousel(slideLength);
    }

    setCarouselTransition("transform duration-1000 ease-in-out");
  };

  const initializeCarousel = (n: number) => {
    const timeoutId = setTimeout(() => {
      setCarouselTransition("");
      setCurrCarousel(n);
    }, 1000);

    return () => clearTimeout(timeoutId); // 컴포넌트가 언마운트될 경우 타임아웃을 지우는 Cleanup function
  };

  return (
    <div className="flex relative overflow-hidden w-full">
      <div
        className={`whitespace-nowrap w-full ${carouselTransition}`}
        style={{ transform: `translateX(${-currCarousel * 100}%)` }}
      >
        {makeNewImageArray().map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full inline-block"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-40 flex justify-between px-4">
        <button
          onClick={slidePrevBtn}
          className="flex text-white text-4xl justify-center items-center"
        >
          <MdArrowBackIosNew />
        </button>
        <button
          onClick={slideNextBtn}
          className="flex text-white text-4xl justify-center items-center"
        >
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="absolute bottom-4 w-full flex justify-center">
        {dummyImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrCarousel(index + 1)}
            className="text-xl mx-2 text-white"
          >
            {index + 1 === currCarousel ? <FaCircle /> : <FaRegCircle />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ADCarousel;
