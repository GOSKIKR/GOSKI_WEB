import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

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
interface Media {
    mediaId: number;
    mediaUrl: string;
}

interface FeedbackData {
    feedbackId: number;
    content: string;
    images: Media[];
    videos: Media[];
}

const dummyFeedbackData: FeedbackData = {
    feedbackId: 4,
    content:
        "강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다",
    images: [
        {
            mediaId: 10,
            mediaUrl:
                "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/images/f8f09ac7-a37c-48df-92b6-0a404bbf7ef3.jpeg",
        },
        {
            mediaId: 11,
            mediaUrl:
                "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/images/f66529d8-7526-4426-950c-0487f65f8515.png",
        },
    ],
    videos: [
        {
            mediaId: 12,
            mediaUrl:
                "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/videos/c74bbd1a-cb7f-48ae-a27e-e3d308b1eaf5.mp4",
        },
    ],
};

const UserFeedback = () => {
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const location = useLocation();
    const { lesson } = (location.state as { lesson: Lesson }) || {};

    useEffect(() => {
        // 여기서 실제 API 호출을 통해 데이터를 가져옵니다.
        // const fetchFeedback = async () => {
        //   try {
        //     const response = await fetch('/path-to-your-api'); // API 엔드포인트를 설정합니다.
        //     const result = await response.json();
        //     if (result.status === 'success') {
        //       setFeedback(result.data);
        //     }
        //   } catch (error) {
        //     console.error('Error fetching feedback:', error);
        //   }
        // };

        // fetchFeedback();

        // Use dummy data instead of API call
        setFeedback(dummyFeedbackData);
    }, []);

    if (!feedback) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="flex flex-col w-full h-screen items-center">
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
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
                                <div className="w-1/2 sm:3/4 text-xs sm:text-base">
                                    {formatDate(lesson.lessonDate)}{" "}
                                    {lesson.startTime}
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
                            <div>{feedback.content}</div>
                        </div>
                    </div>
                    <div className="font-bold mb-2">
                        동영상 ({feedback.videos.length})
                    </div>
                    <div className="bg-primary-50 p-5 rounded-lg shadow-md mb-6">
                        <div className="flex space-x-4 flex-col">
                            {feedback.videos.map((video) => (
                                <div
                                    key={video.mediaId}
                                    className="sm:w-1/3 bg-white p-3 rounded-lg"
                                >
                                    <video className="w-full h-32" controls>
                                        <source
                                            src={video.mediaUrl}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
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
                    <div className="flex flex-row justify-between items-center pb-3">
                        <div className="font-bold mb-2">
                            사진 ({feedback.images.length})
                        </div>
                        <div className="flex bg-primary-500 w-24 h-6 text-sm text-center rounded-lg items-center justify-center">
                            <div className="text-white"> 전체 다운로드</div>
                        </div>
                    </div>
                    <div className="bg-primary-50 p-5 rounded-lg shadow-md mb-6">
                        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                            {feedback.images.map((image) => (
                                <div
                                    key={image.mediaId}
                                    className="w-full bg-white relative rounded-lg"
                                >
                                    <img
                                        src={image.mediaUrl}
                                        alt="feedback"
                                        className="w-full h-32 object-cover"
                                    />
                                    <a
                                        href={image.mediaUrl}
                                        download
                                        className="absolute top-1 right-1 w-5 h-5 text-blue-500"
                                    >
                                        <FiDownload />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFeedback;
