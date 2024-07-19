import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonReserveInfo from "../../../components/instructor/mypage/LessonReserveInfo";
import LessonFeedbackForm from "../../../components/instructor/mypage/LessonFeedbackForm";
import FeedbackVideoRegist from "../../../components/instructor/mypage/FeedbackVideoRegist";
import FeedbackImageRegist from "../../../components/instructor/mypage/FeedbackImageRegist";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";
import { FeedbackService } from "../../../api/FeedbackService";

const feedbackService = new FeedbackService();

const FeedbackRegist: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [content, setContent] = useState("");
    const [videoFiles, setVideoFiles] = useState<File[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const submitFeedback = async () => {
        const formData = new FormData();
        console.log("lessonID -> ",state.lessonId)
        formData.append("lessonId", state.lessonId);
        formData.append("content", content);

        videoFiles.forEach((video) => {
            formData.append("videos", video);
        });

        imageFiles.forEach((image) => {
            formData.append("images", image);
        });

        await feedbackService.createFeedback(formData);
        navigate("/instructor/my-lesson"); 
    };

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor /> : <NavbarInstructorMobile />}
            <div className="flex justify-center mt-20 text-3xl font-bold mb-10">
                피드백 등록
            </div>
            <LessonReserveInfo lesson={state} />
            <LessonFeedbackForm content={content} setContent={setContent} />
            <FeedbackVideoRegist videoFiles={videoFiles} setVideoFiles={setVideoFiles} />
            <FeedbackImageRegist imageFiles={imageFiles} setImageFiles={setImageFiles} />
            <div className="flex justify-center my-10">
                <button
                    className="bg-primary-700 text-white m-2 px-4 py-2 rounded"
                    onClick={submitFeedback}
                >
                    등록완료
                </button>
                <button
                    className="bg-primary-900 text-white m-2 px-4 py-2 rounded"
                    onClick={() => navigate("/instructor/my-lesson")}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
};

export default FeedbackRegist;
