import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import ReviewModal from "./ReviewModal";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import { InstructorReviewDTO } from "../../../dto/ReviewDTO";
import { formatTime } from "../../../utils/formatTime";

import "slick-carousel/slick/slick.css";
import "../../../../public/assets/css/slick-theme-custom.css";

interface LessonSectionProps {
    title: string;
    lessons: InstructorLessonInfoDTO[];
    reviews? : InstructorReviewDTO[];
}


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


const LessonSection: React.FC<LessonSectionProps> = ({ title, lessons, reviews }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [lessonId, setLessonId] = useState<number | undefined>(undefined);
    const navigate = useNavigate();

    const openReviewModal = (lessonId : number) => {
        setIsReviewModalOpen(true);
        setLessonId(lessonId);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        setLessonId(undefined);
    };

    const getReview = (lessonId? : number) => {
        if(reviews) {
            return reviews.filter((review) => review.lessonId === lessonId)[0]
        }
        return null;
    }

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
                                            onClick={() => navigate("/instructor/regist-feedback", {state : lesson})}>피드백 작성하기</button>
                                    </div>
                                )}
                                {lesson.lessonStatus === "yesFeedback" && (
                                    <div className="flex justify-center">
                                        <button 
                                            className="mt-2 mr-2 bg-primary-500 text-white py-1 px-2 rounded w-[120px]"
                                            onClick={() => navigate("/instructor/edit-feedback", {state : lesson})}>피드백 수정하기</button>
                                        <button 
                                            className="mt-2 bg-primary-700 text-white py-1 px-2 rounded w-[120px]" 
                                            onClick={() => openReviewModal(lesson.lessonId)}>리뷰 확인하기</button>
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
            {isReviewModalOpen 
                && 
            <ReviewModal review={getReview(lessonId)} onClose={closeReviewModal} />}
        </div>
    );
};

export default LessonSection;
