import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { FeedbackDataDTO, MediaDTO } from "../../../dto/FeedbackDTO";
import { UserFeedbackService } from "../../../api/UserFeedbackService";

const UserFeedback = () => {
    const [feedback, setFeedback] = useState<FeedbackDataDTO | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { lesson } = location.state || {};
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

    useEffect(() => {
        const fetchFeedback = async () => {
            const userFeedbackService = new UserFeedbackService();
            const feedbackData = await userFeedbackService.getUserFeedback(
                lesson.lessonId
            );
            if (feedbackData) {
                setFeedback(feedbackData);
            }
        };
        fetchFeedback();
    }, [lesson.lessonId]);

    const formatTime = (time: string) => {
        return time.slice(0, 2) + ":" + time.slice(2);
    };

    return (
        <div>
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col w-full h-full items-center mb-12">
                <div className="w-full px-12 pt-8 pb-8 font-extrabold text-black text-2xl h-full">
                    피드백 확인
                </div>
                <div className="flex flex-col w-4/5 rounded-lg items-center py-4 space-y-12">
                    <div className="sm:w-4/5 w-full">
                        <div className="font-bold mb-2">강습 예약 정보</div>
                        <div className="bg-primary-50 p-4 rounded-lg mb-6">
                            <div className="flex sm:flex-row flex-col bg-white w-full sm:h-1/2 h-4/6 rounded-lg items-center justify-center py-10">
                                <img
                                    src={lesson.profileUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full"
                                />
                                <div className="flex flex-col ml-8 items-start space-y-2">
                                    <div
                                        className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                                            lesson.lessonStatus
                                        )}`}
                                    >
                                        {getStatusName(lesson.lessonStatus)}
                                    </div>
                                    <div className="font-bold text-xl">
                                        {lesson.resortName}
                                    </div>
                                    <p className="text-gray-500 sm:text-sm text-xs">
                                        {`${lesson.lessonDate} (${new Date(
                                            lesson.lessonDate
                                        ).toLocaleString("ko-KR", {
                                            weekday: "short",
                                        })}) `}
                                        {`${formatTime(
                                            lesson.startTime
                                        )} ~ ${new Date(
                                            new Date(
                                                `${
                                                    lesson.lessonDate
                                                }T${formatTime(
                                                    lesson.startTime
                                                )}`
                                            ).getTime() +
                                                lesson.duration * 60 * 60 * 1000
                                        ).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}`}
                                    </p>
                                    <div className="flex flex-row space-x-3">
                                        <div className="flex flex-row">
                                            <div className="text-primary-600">
                                                {lesson.teamName}
                                            </div>
                                            <div>팀</div>
                                        </div>
                                        {lesson.instructorName &&
                                            lesson.instructorName != null && (
                                                <div className="flex flex-row">
                                                    <div>강사</div>
                                                    <div className="text-primary-600 ml-1">
                                                        {lesson.instructorName}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold mb-2">강습 피드백 내용</div>
                        <div className="bg-primary-50 p-4 rounded-lg mb-6">
                            <div className="bg-white sm:p-5 py-2 rounded-lg text-sm sm:text-base w-full">
                                <div>{feedback?.content}</div>
                            </div>
                        </div>
                        {feedback &&
                            feedback.videos &&
                            feedback.videos.length > 0 && (
                                <>
                                    <div className="font-bold mb-2">
                                        동영상 ({feedback.videos.length})
                                    </div>
                                    <div className="bg-primary-50 p-5 rounded-lg shadow-md mb-6">
                                        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                                            {feedback.videos.map((video) => (
                                                <div
                                                    key={video.mediaId}
                                                    className="flex flex-col justify-between items-center sm:w-40 bg-white p-3 rounded-lg"
                                                >
                                                    <video
                                                        controls
                                                        className="w-full h-full"
                                                    >
                                                        <source
                                                            src={video.mediaUrl}
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                    <a
                                                        href={video.mediaUrl}
                                                        download
                                                        className="flex items-center justify-center mt-2 py-1 w-full text-white bg-primary-500 rounded-md "
                                                    >
                                                        <div>
                                                            <FiDownload />
                                                        </div>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        {feedback &&
                            feedback.images &&
                            feedback.images.length > 0 && (
                                <>
                                    <div className="flex flex-row justify-between items-center pb-3">
                                        <div className="font-bold mb-2">
                                            사진 ({feedback.images.length})
                                        </div>
                                        <div className="flex bg-primary-500 w-24 h-6 text-sm text-center rounded-lg items-center justify-center">
                                            <div className="text-white">
                                                전체 다운로드
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-primary-50 p-5 rounded-lg shadow-md mb-6">
                                        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                                            {feedback.images.map((image) => (
                                                <div
                                                    key={image.mediaId}
                                                    className="flex w-40 h-40 bg-gray-100 relative items-center justify-center rounded-lg"
                                                >
                                                    <img
                                                        src={image.mediaUrl}
                                                        alt="feedback"
                                                        className="w-32 h-32 object-cover bg-white rounded-lg"
                                                    />
                                                    <a
                                                        href={image.mediaUrl}
                                                        download
                                                        className="absolute top-1.5 right-1.5 w-5 h-5 text-lg font-extrabold text-blue-500"
                                                    >
                                                        <FiDownload />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFeedback;
