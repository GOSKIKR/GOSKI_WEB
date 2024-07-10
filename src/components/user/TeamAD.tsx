import React, { useEffect, useRef, useState } from "react";

const logoList = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
];

const TeamAD = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.scrollWidth / 2);
    }
  }, []);

  const handleMouseEnter = () => {
    if (sliderRef.current) {
      sliderRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (sliderRef.current) {
      sliderRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div className="overflow-hidden">
      <div
        className="flex animate-teamLogoSlide"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: `${sliderWidth}px`,
          animationDuration: `${logoList.length * 2}s`,
        }}
      >
        {[...logoList, ...logoList].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex-shrink-0 w-[200px] h-[100px] mx-4"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamAD;
