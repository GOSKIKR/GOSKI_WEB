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
        <div className="flex flex-col w-full h-screen items-center">
            <div className="w-full">
                {window.innerWidth > 640 ? (
                    <NavbarUser />
                ) : (
                    <NavbarUserMobile />
                )}
            </div>
            <div className="flex flex-col w-4/5 rounded-lg items-center py-4 space-y-10">
                <div className="sm:w-4/5 w-full">
                    <div className="font-bold mb-2">강습 예약 정보</div>
                    <div className="bg-primary-50 p-4 rounded-lg mb-6">
                        <div className="bg-white sm:p-4 py-2 rounded-lg text-sm sm:text-base w-full">
                            <div className="flex flex-row space-x-8 w-full">
                                <div className="sm:w-12 w-1/4 text-center">
                                    장소
                                </div>
                                <div className="w-1/2 sm:3/4">
                                    {lesson.resortName}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-8">
                                <div className="sm:w-12 w-1/4 text-center">
                                    팀
                                </div>
                                <div className="w-1/2 sm:3/4">
                                    {lesson.teamName}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-8">
                                <div className="sm:w-12 w-1/4 text-center">
                                    일시
                                </div>
                                <div className="flex flex-row w-2/3 sm:3/4">
                                    <p>{`${lesson.lessonDate} (${new Date(
                                        lesson.lessonDate
                                    ).toLocaleString("ko-KR", {
                                        weekday: "short",
                                    })}) `}</p>
                                    <div className="text-gray-500 sm:text-sm text-xs px-1.5">{`${formatTime(
                                        lesson.startTime
                                    )} ~ ${new Date(
                                        new Date(
                                            `${lesson.lessonDate}T${formatTime(
                                                lesson.startTime
                                            )}`
                                        ).getTime() +
                                            lesson.duration * 60 * 60 * 1000
                                    ).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}`}</div>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-8">
                                <div className="sm:w-12 w-1/4 text-center">
                                    강습
                                </div>
                                <div>1:2 스키</div>
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
    );
};

export default UserFeedback;
