import React, { useState, useEffect, useRef } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const dummyImages = [
  "https://via.placeholder.com/800x400?text=Slide+1",
  "https://via.placeholder.com/800x400?text=Slide+2",
  "https://via.placeholder.com/800x400?text=Slide+3",
  "https://via.placeholder.com/800x400?text=Slide+4",
];

const TeamAD = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    dummyImages[dummyImages.length - 1],
    ...dummyImages,
    dummyImages[0],
  ]);

  const slideRef = useRef(null);

  useEffect(() => {
    setImages([
      dummyImages[
        currentIndex === 0 ? dummyImages.length - 1 : currentIndex - 1
      ],
      dummyImages[currentIndex],
      dummyImages[(currentIndex + 1) % dummyImages.length],
    ]);
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === dummyImages.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return dummyImages.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <div className="flex relative overflow-hidden w-full">
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10">
        <MdArrowBackIosNew size={24} onClick={handlePrevSlide} />
      </div>
      <div
        className="flex whitespace-nowrap w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full"
          />
        ))}
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10">
        <MdArrowForwardIos size={24} onClick={handleNextSlide} />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {dummyImages.map((_, index) => (
          <div key={index} className="cursor-pointer">
            {index === currentIndex ? (
              <FaCircle size={12} />
            ) : (
              <FaRegCircle size={12} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamAD;
