import React, { useEffect, useRef, useState } from "react";

const logoList = [
  "/assets/images/TeamLogo1.png",
  "/assets/images/TeamLogo2.png",
  "/assets/images/TeamLogo3.png",
  "/assets/images/TeamLogo4.png",
  "/assets/images/TeamLogo5.png",
  "/assets/images/TeamLogo6.png",
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
                    animationDuration: `${logoList.length * 8}s`,
                }}
            >
                {[...logoList, ...logoList, ...logoList, ...logoList].map(
                    (logo, index) => (
                        <div
                            key={`${logo}-${index}`}
                            className="flex-shrink-0 w-[250px] h-auto mx-4"
                        >
                            <img
                                src={logo}
                                alt={`Logo ${index + 1}`}
                                className="w-full h-full"
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TeamAD;
