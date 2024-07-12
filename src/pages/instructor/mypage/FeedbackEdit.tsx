import React,{useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonReserveInfo from "../../../components/instructor/mypage/LessonReserveInfo";
import LessonFeedbackForm from "../../../components/instructor/mypage/LessonFeedbackForm";
import FeedbackVideoRegist from "../../../components/instructor/mypage/FeedbackVideoRegist";
import FeedbackImageRegist from "../../../components/instructor/mypage/FeedbackImageRegist";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";
import { UserFeedbackService } from "../../../api/UserFeedbackService";
import { FeedbackDataDTO } from "../../../dto/FeedbackDTO";

const feedbackService = new UserFeedbackService();

const FeedbackEdit : React.FC = () => {
    const [feedback, setFeedback] = useState<FeedbackDataDTO | null>(null);
    const navigate = useNavigate();
    const {state} = useLocation();
    const[innerWidth,setInnerWidth] = useState(window.innerWidth);
    const[content, setContent] = useState("");

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        const fetchFeedback = async () => {
            const feedback = await feedbackService.getUserFeedback(state.lessonId)
            if(feedback){
                setFeedback(feedback);
                setContent(feedback?.content)
            }
        }

        fetchFeedback();

        window.addEventListener("resize",handleResize);
        return(() => window.removeEventListener("resize",handleResize))
    },[setFeedback,state.lessonId])


    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor/>  : <NavbarInstructorMobile/>}
            <div className="flex justify-center mt-20 text-3xl font-bold mb-10">
                피드백 수정
            </div>
            <LessonReserveInfo lesson={state}/>
            <LessonFeedbackForm content={content} setContent={setContent}/>
            <FeedbackVideoRegist/>
            <FeedbackImageRegist/>
            <div className="flex justify-center my-10">
                <button 
                    className="bg-primary-700 text-white m-2 px-4 py-2 rounded"
                    onClick = {() => navigate("/instructor/my-lesson")}>
                    수정완료
                </button>
                <button 
                    className="bg-primary-900 text-white m-2 px-4 py-2 rounded"
                    onClick = {() => navigate("/instructor/my-lesson")}>
                    돌아가기
                </button>
            </div>
        </div>
    )
}

export default FeedbackEdit;