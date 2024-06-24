import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonReserveInfo from "../../../components/instructor/mypage/LessonReserveInfo";
import LessonFeedbackForm from "../../../components/instructor/mypage/LessonFeedbackForm";
import FeedbackVideoRegist from "../../../components/instructor/mypage/FeedbackVideoRegist";
import FeedbackImageRegist from "../../../components/instructor/mypage/FeedbackImageRegist";

const FeedbackRegist : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <div className="flex justify-center mt-20 text-3xl font-bold mb-10">
                강습 내역
            </div>
            <LessonReserveInfo/>
            <LessonFeedbackForm/>
            <FeedbackVideoRegist/>
            <FeedbackImageRegist/>
            <div className="flex justify-center my-10">
                <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded">
                    수정완료
                </button>
                <button className="bg-primary-900 text-white m-2 px-4 py-2 rounded">
                    돌아가기
                </button>
            </div>
        </div>
    )
}

export default FeedbackRegist;