import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

interface Lesson {
    lessonId: number;
    teamId: number;
    teamName: string;
    resortName: string;
    instructorId: number;
    instructorName: string;
    profileUrl: string;
    lessonDate: string;
    lessonStatus: string;
    startTime: string;
    duration: number;
    hasReview: boolean;
    studentCount: number;
}
interface LessonlistCardProps {
    lesson: Lesson;
}

const LessonlistCard: React.FC<LessonlistCardProps> = ({ lesson }) => {
    const navigate = useNavigate();

    const goToPayDetail = () => {
        navigate(`/user/payment/detail`, { state: { lesson } });
    };

    const goToWriteReview = () => {
        navigate(`/user/review`, { state: { lesson } });
    };

    const goToFeedback = () => {
        navigate(`/user/feedback`, { state: { lesson } });
    };

    return (
        <div className="bg-primary-50 h-40 w-full rounded-md shadow-lg flex flex-row px-3 sm:px-12 py-8 justify-between items-center">
            <div className="sm:h-32 sm:w-32 h-24 w-24 bg-white">사진</div>
            <div className="flex flex-col w-1/3 px-1.5 sm:px-0 sm:text-md text-sm space-y-1 sm:space-y-0.5">
                <div className="font-extrabold">{lesson.lessonStatus}</div>
                <div>{lesson.resortName}</div>
                <div>{lesson.startTime}</div>
                <div>
                    {lesson.teamName}, {lesson.instructorName}
                </div>
            </div>
            <div className="flex flex-col w-1/3 px-1.5 sm:px-0 sm:text-md text-sm space-y-1 sm:space-y-0.5">
                <div>{lesson.duration} 분</div>
                <div
                    className="flex flex-row items-center space-x-2"
                    onClick={goToPayDetail}
                >
                    <div>결제 상세</div>
                    <AiOutlineRight size={12} />
                </div>
                <div
                    className="flex flex-row items-center space-x-2"
                    onClick={goToFeedback}
                >
                    <div>피드백 확인</div>
                    <AiOutlineRight size={12} />
                </div>
                <div
                    className={`flex flex-row items-center space-x-2 ${
                        lesson.hasReview ? "" : "cursor-pointer"
                    }`}
                    onClick={lesson.hasReview ? undefined : goToWriteReview}
                >
                    <div>
                        {lesson.hasReview ? "리뷰 작성 완료" : "리뷰 작성"}
                    </div>
                    {!lesson.hasReview && <AiOutlineRight size={12} />}
                </div>
            </div>
        </div>
    );
};

export default LessonlistCard;
