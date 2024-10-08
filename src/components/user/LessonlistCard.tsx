import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLessonDTO } from "../../dto/UserLessonDTO";
import { UserPaylistDTO } from "../../dto/PaymentDTO";
import { TeamInfoDTO } from "../../dto/TeamDTO";
import { TeamService } from "../../api/TeamService";

interface LessonlistCardProps {
    lesson: UserLessonDTO;
    paymentDetail?: UserPaylistDTO;
}

const LessonlistCard: React.FC<LessonlistCardProps> = ({
    lesson,
    paymentDetail,
}) => {
    const navigate = useNavigate();
    const [teamInfo, setTeamInfo] = useState<TeamInfoDTO | null>(null);

    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (!lesson) return;
            const teamService = new TeamService();
            const teamData = await teamService.getTeamInfo(lesson.teamId);
            setTeamInfo(teamData);
        };

        fetchTeamInfo();
    }, [lesson]);

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
        <div className="bg-primary-50 h-40 min-w-96 w-full rounded-md shadow-lg flex flex-row px-3 sm:px-16 space-x-1 items-center">
            <div className="flex flex-row space-x-8 sm:space-x-2 w-4/5 min-w-40 items-center">
                <div className="flex items-center justify-center sm:h-32 sm:w-32 h-20 w-20 min-h-20 min-w-20">
                    <img
                        src={
                            lesson?.profileUrl || teamInfo?.teamProfileImageUrl
                        }
                        className="w-full h-full cursor-not-allowed rounded-lg"
                    />
                </div>

                <div className="flex flex-col sm:w-3/4 min-w-48 w-3/5 sm:pl-4 sm:text-md text-sm sm:space-y-1.5 space-y-1">
                    <div
                        className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                            lesson.lessonStatus
                        )}`}
                    >
                        {getStatusName(lesson.lessonStatus)}
                    </div>
                    <div className="pl-1.5">{lesson.resortName}</div>
                    <div className="text-gray-500 text-xs px-1.5 sm:flex-row flex-col">
                        <div>
                            {`${lesson.lessonDate} (${new Date(
                                lesson.lessonDate
                            ).toLocaleString("ko-KR", {
                                weekday: "short",
                            })}) `}
                        </div>
                        <div>
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
                                hour12: false,
                            })}`}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row ml-2 sm:space-x-3">
                        <div className="flex flex-row">
                            <div className="text-primary-600">
                                {lesson.teamName}
                            </div>
                            <div>팀</div>
                        </div>
                        <div className="flex flex-row ">
                            {lesson.instructorName ? <div>강사</div> : ""}
                            <div className="text-primary-600 ml-1">
                                {lesson.instructorName || ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-1/3 min-w-32 h-full sm:px-0 sm:text-md text-xs justify-center sm:items-end items-center space-y-2">
                {paymentDetail && (
                    <div className="flex flex-row space-x-2 text-sm">
                        <div className="text-gray-500">결제 금액</div>
                        <div>{paymentDetail.totalAmount}원</div>
                    </div>
                )}
                <div
                    className="text-center sm:w-24 w-20 sm:h-6 text-[11px] sm:text-xs bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white flex items-center justify-center"
                    onClick={goToPayDetail}
                >
                    <div>결제 상세</div>
                </div>
                {lesson.lessonStatus === "lessonFinished" && (
                    <>
                        {lesson.hasFeedback ? (
                            <div
                                className="text-center space-x-2 sm:w-24 sm:h-6 text-[11px] sm:text-xs w-20  py-0.5 bg-primary-500 hover:bg-primary-800 rounded-md shadow-md text-white flex items-center justify-center"
                                onClick={goToFeedback}
                            >
                                <div>피드백 확인</div>
                            </div>
                        ) : (
                            <div className="text-center space-x-2 sm:w-24 sm:h-6 text-[11px] sm:text-xs w-20  py-0.5 bg-gray-400 rounded-md shadow-md text-white flex items-center justify-center">
                                <div>피드백 미작성</div>
                            </div>
                        )}

                        <div
                            className={`text-center space-x-2 sm:w-24 sm:text-xs text-[11px] sm:h-6 w-20 text-xs py-0.5 rounded-md shadow-md text-white flex items-center justify-center ${
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
