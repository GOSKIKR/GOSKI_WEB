import React from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="bg-primary-50 h-40 w-full rounded-md shadow-lg flex flex-row px-3 sm:px-16 space-x-1 items-center">
            <div className="flex flex-row space-x-5 w-3/4 items-center">
                <img
                    src={lesson.profileUrl}
                    className="sm:h-32 sm:w-32 h-20 w-20 rounded-lg cursor-not-allowed"
                />
                <div className="flex flex-col sm:w- w-3/4 pl-2 sm:px-4 sm:text-md text-sm sm:space-y-1 space-y-1">
                    <div
                        className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                            lesson.lessonStatus
                        )}`}
                    >
                        {getStatusName(lesson.lessonStatus)}
                    </div>
                    <div className="pl-1.5">{lesson.resortName}</div>
                    <p className="text-gray-500 sm:text-sm text-xs px-1.5">
                        {`${lesson.lessonDate} (${new Date(
                            lesson.lessonDate
                        ).toLocaleString("ko-KR", {
                            weekday: "short",
                        })}) `}
                        {`${formatTime(lesson.startTime)} ~ ${new Date(
                            new Date(
                                `${lesson.lessonDate}T${formatTime(
                                    lesson.startTime
                                )}`
                            ).getTime() +
                                lesson.duration * 60 * 60 * 1000
                        ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}`}
                    </p>
                    <div className="flex flex-row ml-2 space-x-3">
                        <div className="flex flex-row">
                            <div className="text-primary-600">
                                {lesson.teamName}
                            </div>
                            <div>팀</div>
                        </div>
                        <div className="flex flex-row">
                            <div>강사</div>
                            <div className="text-primary-600 ml-1">
                                {lesson.instructorName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:w-1/3 w-1/3 h-full sm:px-0 sm:text-md text-xs justify-center sm:items-end items-center space-y-3">
                {paymentDetail && (
                    <div className="flex flex-row space-x-2 sm:text-sm text-[10px]">
                        <div className="text-gray-500">결제 금액</div>
                        <div>{paymentDetail.totalAmount}원</div>
                    </div>
                )}
                <div
                    className="text-center sm:w-24 sm:text-sm w-20 sm:h-6 text-xs py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white"
                    onClick={goToPayDetail}
                >
                    <div>결제 상세</div>
                </div>
                {lesson.lessonStatus === "lessonFinished" && (
                    <>
                        {lesson.hasFeedback ? (
                            <div
                                className="text-center space-x-2 sm:w-24 sm:h-6 sm:text-sm w-20 text-xs py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white"
                                onClick={goToFeedback}
                            >
                                <div>피드백 확인</div>
                            </div>
                        ) : (
                            <div className="text-center space-x-2 sm:w-24 sm:h-6 sm:text-sm w-20 text-xs py-0.5 bg-gray-400 rounded-md shadow-md text-white">
                                <div>피드백 미작성</div>
                            </div>
                        )}

                        <div
                            className={`text-center space-x-2 sm:w-24 sm:text-sm sm:h-6 w-20 text-xs py-0.5 rounded-md shadow-md text-white ${
                                lesson.hasReview
                                    ? "bg-gray-400"
                                    : "bg-primary-500 hover:bg-primary-800  cursor-pointer"
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
