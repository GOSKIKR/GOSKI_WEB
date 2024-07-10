import React, { useState } from "react";

interface Slide {
  color: string;
  target: string;
}

const slides: Slide[] = [
  { color: "red", target: "#" },
  { color: "black", target: "#" },
  { color: "black", target: "#" },
  { color: "black", target: "#" },
  { color: "black", target: "#" },
  { color: "black", target: "#" },
  { color: "purple", target: "#" },
];

const Homepage: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const onStop = () => setIsAnimating(false);
  const onRun = () => setIsAnimating(true);

  const animationStyle = {
    animationPlayState: isAnimating ? "running" : "paused",
  };

  return (
    <div className="wrapper">
      <div className="overflow-hidden">
        <ul
          className="flex flex-nowrap"
          onMouseEnter={onStop}
          onMouseLeave={onRun}
        >
          <div
            className="flex items-center flex-nowrap relative border-t border-b border-gray-300 py-10 animate-slide1 before:content-[''] before:block before:w-full before:h-px before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gray-300 before:z-10"
            style={animationStyle}
          >
            {slides.map((s, i) => (
              <li
                key={i}
                className="mx-20 cursor-pointer z-20 transition-transform duration-300 ease-in-out transform hover:scale-98 hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:bg-black hover:after:bg-opacity-20 w-50 h-50"
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: s.color }}
                ></div>
              </li>
            ))}
          </div>
          <div
            className="flex items-center flex-nowrap relative border-t border-b border-gray-300 py-10 animate-slide2 before:content-[''] before:block before:w-full before:h-px before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gray-300 before:z-10"
            style={animationStyle}
          >
            {slides.map((s, i) => (
              <li
                key={i}
                className="mx-20 cursor-pointer z-20 transition-transform duration-300 ease-in-out transform hover:scale-98 hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:bg-black hover:after:bg-opacity-20 w-50 h-50"
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: s.color }}
                ></div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
