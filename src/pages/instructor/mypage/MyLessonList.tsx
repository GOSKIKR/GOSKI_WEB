import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonSection from "../../../components/instructor/mypage/LessonSection";
import { dummyInstructorLessonData } from "../../../dto/InstructorLessonInfoDTO";

const MyLessonList: React.FC = () => {
    const notStartedLessons = dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "notStart");
    const feedbackNotWrittenLessons = dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "lessonFinished");
    const feedbackWrittenLessons = dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "yesFeedback");

    return (
        <div>
            <NavbarInstructor />
            <div className="flex justify-center mt-20 mb-10">
                <div className="w-[1000px]">
                    <div className="text-2xl font-bold">강습 내역</div>
                    <div className="bg-primary-200 p-5 rounded mt-6">
                        <LessonSection title="진행 예정" lessons={notStartedLessons} />
                        <LessonSection title="피드백 미작성" lessons={feedbackNotWrittenLessons} />
                        <LessonSection title="피드백 작성" lessons={feedbackWrittenLessons} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLessonList;
