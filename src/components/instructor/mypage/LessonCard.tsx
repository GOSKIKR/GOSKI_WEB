import React, { useState } from "react";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import ReviewModal from "./ReviewModal";
import { ReviewDTO } from "../../../dto/ReviewDTO";

interface LessonCardProps {
    lesson: InstructorLessonInfoDTO;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const openReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

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

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="text-gray-600 text-sm mb-1">{lesson.lessonDate} {lesson.startTime} ~ {lesson.startTime}</div>
            <div className="font-bold text-lg">{lesson.resortName}</div>
            <div className="text-gray-800 text-md">{lesson.teamName}</div>
            <div className="text-gray-500 text-sm">{lesson.representativeName} 외 {lesson.studentCount}명</div>
            {lesson.lessonStatus === "lessonFinished" && (
                <div className="flex justify-end">
                    <button className="mt-2 bg-primary-500 text-white py-1 px-2 rounded">피드백 작성하기</button>
                </div>
            )}
            {lesson.lessonStatus === "yesFeedback" && (
                <div className="flex justify-end">
                    <button className="mt-2 mr-2 bg-primary-500 text-white py-1 px-2 rounded">피드백 수정하기</button>
                    <button className="mt-2 bg-primary-700 text-white py-1 px-2 rounded" onClick={openReviewModal}>리뷰 확인하기</button>
                </div>
            )}
            {isReviewModalOpen  && <ReviewModal review={review} onClose={closeReviewModal} />}
        </div>
    );
};

export default LessonCard;
