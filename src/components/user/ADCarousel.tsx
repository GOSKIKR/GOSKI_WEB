import React, { useState, useEffect, useRef } from "react";

const ADCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
    "https://via.placeholder.com/800x400?text=Slide+4",
  ];

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
          ) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1) // 마지막 인덱스인 경우 0으로 변경
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
        className="whitespace-nowrap transition-transform duration-1000"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full inline-block"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
          className="bg-gray-800 text-white p-2 rounded-full w-20 h-20"
        >
          이전
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
          }
          className="bg-gray-800 text-white p-2 rounded-full w-20 h-20"
        >
          다음
        </button>
      </div>
      <div className="absolute bottom-10 w-full flex justify-center p-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-4 w-4 rounded-full mx-1 ${
              idx === currentIndex ? "bg-white" : "bg-black"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ADCarousel;
