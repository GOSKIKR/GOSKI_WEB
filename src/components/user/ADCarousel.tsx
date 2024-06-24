import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

const dummyImages = [
  "https://via.placeholder.com/800x400?text=Slide+1",
  "https://via.placeholder.com/800x400?text=Slide+2",
  "https://via.placeholder.com/800x400?text=Slide+3",
  "https://via.placeholder.com/800x400?text=Slide+4",
];

const ADCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    dummyImages[dummyImages.length - 1],
    ...dummyImages,
    dummyImages[0],
  ]);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      // null이 아닌 경우
      clearTimeout(timeoutRef.current); // 타이머 제거
    }
  };

  useEffect(() => {
    resetTimeout(); // 컴포넌트가 업데이트 될 때마다 타이머 제거
    timeoutRef.current = setTimeout(
      // 타이머 설정
      () =>
        setCurrentIndex(
          (
            prevIndex // 현재 인덱스를 변경
          ) => (prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1) // 마지막 인덱스인 경우 0으로 변경
        ),
      5000 // 5초
    );
    return () => {
      resetTimeout(); // 컴포넌트가 언마운트 될 때 타이머 제거
    };
  }, [currentIndex]); // currentIndex가 변경될 때마다 useEffect 실행 ^^b

  return (
    <div className="flex relative overflow-hidden w-full">
      <div
        className="whitespace-nowrap w-full transition-transform duration-1000"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {dummyImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full inline-block"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-40 flex justify-between px-4">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? dummyImages.length - 1 : prevIndex - 1
            )
          }
          className="flex text-white text-9xl justify-center items-center"
        >
          <MdArrowBackIosNew />
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
            )
          }
          className="flex text-white text-9xl justify-center items-center"
        >
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="absolute bottom-10 w-full flex justify-center p-2">
        {dummyImages.map((_, idx) => (
          <div
            key={idx}
            className="flex h-10 w-20 text-white text-3xl justify-center items-center"
          >
            {idx === currentIndex ? <FaCircle /> : <FaRegCircle />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ADCarousel;
