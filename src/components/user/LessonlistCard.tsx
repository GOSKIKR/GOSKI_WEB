import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { UserLessonDTO } from "../../dto/UserLessonDTO";
import { UserPaylistDTO } from "../../dto/PaymentDTO";

interface LessonlistCardProps {
    lesson: UserLessonDTO;
    paymentDetail?: UserPaylistDTO;
}

const LessonlistCard: React.FC<LessonlistCardProps> = ({
    lesson,
    paymentDetail,
}) => {
    const navigate = useNavigate();

    const goToPayDetail = () => {
        navigate(`/user/payment/detail`, { state: { lesson, paymentDetail } });
    };

    const goToWriteReview = () => {
        navigate(`/user/review`, { state: { lesson } });
    };

    const goToFeedback = () => {
        navigate(`/user/feedback`, { state: { lesson } });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "notStart":
                return "bg-yellow-100";
            case "onGoing":
                return "bg-green-100";
            case "lessonFinished":
                return "bg-blue-100";
            case "cancelLesson":
                return "bg-red-100";
            default:
                return "bg-transparent";
        }
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case "notStart":
                return "강습 예정";
            case "onGoing":
                return "진행 중";
            case "lessonFinished":
                return "강습 완료";
            case "cancelLesson":
                return "취소된 강습";
            default:
                return "";
        }
    };

    const formatTime = (time: string) => {
        return time.slice(0, 2) + ":" + time.slice(2);
    };

    return (
        <div className="bg-primary-50 h-40 w-full rounded-md shadow-lg flex flex-row px-3 sm:px-12 py-5 justify-between items-center">
            <img
                src={lesson.profileUrl}
                className="sm:h-32 sm:w-32 h-24 w-24 rounded-lg"
            />
            <div className="flex flex-col w-1/3 sm:px-0 sm:text-md text-sm sm:space-y-1 space-y-0.5">
                <div
                    className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                        lesson.lessonStatus
                    )}`}
                >
                    {getStatusName(lesson.lessonStatus)}
                </div>
                <div className="px-1.5">{lesson.resortName}</div>
                <p className="text-gray-500 sm:text-sm text-xs px-1.5">{`${
                    lesson.lessonDate
                } (${new Date(lesson.lessonDate).toLocaleString("ko-KR", {
                    weekday: "short",
                })}) `}</p>
                <div className="text-gray-500 sm:text-sm text-xs px-1.5">{`${formatTime(
                    lesson.startTime
                )} ~ ${new Date(
                    new Date(
                        `${lesson.lessonDate}T${formatTime(lesson.startTime)}`
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
            <div className="flex flex-col w-1/3 h-full px-1.5 pt-2 sm:px-0 sm:text-md text-sm justify-start space-y-2 items-center">
                {paymentDetail && (
                    <div>
                        <div className="text-gray-500">결제 금액</div>
                        <div>{paymentDetail.totalAmount}원</div>
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
