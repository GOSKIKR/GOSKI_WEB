import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import ReviewModal from "./ReviewModal";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import { ReviewDTO } from "../../../dto/ReviewDTO";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LessonSectionProps {
    title: string;
    lessons: InstructorLessonInfoDTO[];
}

const review: ReviewDTO | null = {
    reviewId: 18,
    rating: 3,
    content: "리뷰 예시 1",
    createdAt: "2024-05-09T13:40:18.9398742",
    instructorTags: [
        { tagReviewId: 4, tagName: "잘생겼어요" },
        { tagReviewId: 5, tagName: "친절해요" },
    ],
};

const settings = (lessonsLength: number) => ({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: lessonsLength >= 3 ? 3 : lessonsLength,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

const formatTime = (startTime: number, duration: number) => {
    const startHour = Math.floor(startTime / 100);
    const startMinutes = startTime % 100;

    let endHour = startHour + duration;
    const endMinutes = startMinutes;

    if (endHour >= 24){
        endHour -= 24;
    }

    const format = (hour: number, minutes: number) => {
        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return `${format(startHour, startMinutes)} ~ ${format(endHour, endMinutes)}`;
};

const LessonSection: React.FC<LessonSectionProps> = ({ title, lessons }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const navigate = useNavigate();

    const openReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    return (
        <div className="mb-6">
            <div className="text-xl font-bold mb-4 pl-3">{title} ({lessons.length})</div>
            {lessons.length === 0 ? (
                <div className="text-center text-gray-500">{title}인 강습이 존재하지 않습니다.</div>
            ) : (
                <Slider {...settings(lessons.length)}>
                    {lessons.map((lesson, index) => (
                        <div key={index} className={`px-2 ${lessons.length <= 3 ? 'flex justify-start' : ''}`}>
                            <div className="bg-white rounded shadow p-4 h-full">
                                <div className="text-gray-600 text-sm mb-1">
                                    {lesson.lessonDate} {formatTime(Number(lesson.startTime), lesson.duration)}
                                </div>
                                <div className="font-bold text-lg">{lesson.resortName}</div>
                                <div className="text-gray-800 text-md">{lesson.teamName}</div>
                                <div className="text-gray-500 text-sm">{lesson.representativeName} 외 {lesson.studentCount}명</div>
                                {lesson.lessonStatus === "lessonFinished" && (
                                    <div className="flex justify-center">
                                        <button 
                                            className="mt-2 bg-primary-500 text-white py-1 px-2 rounded w-[120px]"
                                            onClick={() => navigate("/instructor/regist-feedback")}>피드백 작성하기</button>
                                    </div>
                                )}
                                {lesson.lessonStatus === "yesFeedback" && (
                                    <div className="flex justify-center">
                                        <button 
                                            className="mt-2 mr-2 bg-primary-500 text-white py-1 px-2 rounded w-[120px]"
                                            onClick={() => navigate("/instructor/edit-feedback")}>피드백 수정하기</button>
                                        <button 
                                            className="mt-2 bg-primary-700 text-white py-1 px-2 rounded w-[120px]" 
                                            onClick={openReviewModal}>리뷰 확인하기</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {lessons.length < 3 && Array.from({ length: 3 - lessons.length }).map((_, index) => (
                        <div key={`placeholder-${index}`} className="px-2">
                            <div className="bg-transparent p-4 h-full"></div>
                        </div>
                    ))}
                </Slider>
            )}
            {isReviewModalOpen && <ReviewModal review={review} onClose={closeReviewModal} />}
        </div>
    );
};

export default LessonSection;
