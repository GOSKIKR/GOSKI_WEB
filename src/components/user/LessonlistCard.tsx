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

interface PaymentDetail {
    cost: number;
    paybackRate: number;
}

interface LessonlistCardProps {
    lesson: Lesson;
    paymentDetail?: PaymentDetail;
}

const LessonlistCard: React.FC<LessonlistCardProps> = ({
    lesson,
    paymentDetail,
}) => {
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "진행 예정":
                return "bg-yellow-100";
            case "진행 중":
                return "bg-green-100";
            case "강습 완료":
                return "bg-blue-100";
            default:
                return "bg-transparent";
        }
    };

    return (
        <div className="bg-primary-50 h-40 w-full rounded-md shadow-lg flex flex-row px-3 sm:px-12 py-5 justify-between items-center">
            <div className="sm:h-32 sm:w-32 h-24 w-24 bg-white">사진</div>
            <div className="flex flex-col w-1/3 sm:px-0 sm:text-md text-sm sm:space-y-1 space-y-0.5">
                <div
                    className={`font-extrabold w-16 text-center rounded-md ${getStatusColor(
                        lesson.lessonStatus
                    )}`}
                >
                    {lesson.lessonStatus}
                </div>
                <div className="px-1.5">{lesson.resortName}</div>
                <p className="text-gray-500 sm:text-sm text-xs px-1.5">{`${
                    lesson.lessonDate
                } (${new Date(lesson.lessonDate).toLocaleString("ko-KR", {
                    weekday: "short",
                })}) `}</p>
                <div className="text-gray-500 sm:text-sm text-xs px-1.5">{`${
                    lesson.startTime
                } ~ ${new Date(
                    new Date(
                        `${lesson.lessonDate}T${lesson.startTime}`
                    ).getTime() +
                        lesson.duration * 60 * 60 * 1000
                ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`}</div>
                <div className="px-1.5">
                    {lesson.teamName}, {lesson.instructorName}
                </div>
            </div>
            <div className="flex flex-col w-1/3 h-full px-1.5 sm:px-0 sm:text-md text-sm justify-start space-y-2 items-center">
                {paymentDetail && (
                    <div>
                        <div>결제 금액 : {paymentDetail.cost}원</div>
                    </div>
                )}
                <div
                    className="text-center w-24 py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white"
                    onClick={goToPayDetail}
                >
                    <div>결제 상세</div>
                </div>
                {lesson.lessonStatus === "강습 완료" && (
                    <>
                        <div
                            className="text-center space-x-2 w-24 py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white"
                            onClick={goToFeedback}
                        >
                            <div>피드백 확인</div>
                        </div>
                        <div
                            className={`text-center space-x-2 w-24 py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white ${
                                lesson.hasReview ? "" : "cursor-pointer"
                            }`}
                            onClick={
                                lesson.hasReview ? undefined : goToWriteReview
                            }
                        >
                            <div>
                                {lesson.hasReview
                                    ? "리뷰 작성 완료"
                                    : "리뷰 작성"}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LessonlistCard;
