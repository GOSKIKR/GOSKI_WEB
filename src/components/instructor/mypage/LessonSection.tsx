import React from "react";
import Slider from "react-slick";
import LessonCard from "./LessonCard";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LessonSectionProps {
    title: string;
    lessons: InstructorLessonInfoDTO[];
}

const LessonSection: React.FC<LessonSectionProps> = ({ title, lessons }) => {
    
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    return (
        <div className="mb-6">
            <div className="text-xl font-bold mb-4">{title} ({lessons.length})</div>
            <Slider {...settings}>
                {lessons.map((lesson, index) => (
                    <div key={index} className="px-2">
                        <LessonCard lesson={lesson} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default LessonSection;
